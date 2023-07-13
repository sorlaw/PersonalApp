import express from "express";
import cors from "cors";
import OrangRoute from "./routes/OrangRoute.js";
import UserRoute from "./routes/UserRoute.js";
import { fileURLToPath } from "url";
import path from "path";
import multer from "multer";
import data from "./controller/prov.js";
import Orang from "./models/Orangmodel.js";
import fs from "fs";

const baseUrl = `192.168.100.138`;

const app = express();

app.use(cors());

const __fileName = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__fileName);

//init multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "gambar");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.post(
  "/orang",
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("file"),
  async (req, res) => {
    const { nama, provinsi, kota } = req.body;

    const image = req.file.path.replace(/\\/g, "/");
    const url = `http://${baseUrl}:5000/${image}`;

    if (!req.file) {
      res.status(422).json({ msg: "masukkan gambar" });
    } else {
      try {
        await Orang.create({
          nama: nama,
          provinsi: provinsi,
          kota: kota,
          poto: image,
          url: url,
        });
        res.status(201).json({ msg: "data is inserted" });
      } catch (error) {
        console.log(error.message);
      }
    }
  }
);
app.patch(
  "/orang/:id",
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("file"),
  async (req, res) => {
    const orang = await Orang.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!orang) return res.status(404).json({ msg: "not found" });

    const { nama, provinsi, kota } = req.body;

    const image = req.file.path.replace(/\\/g, "/");
    const url = `http://${baseUrl}:5000/${image}`;

    let fileName = "";
    if (req.file == null) {
      // res.status(422).json({ msg: "masukkan gambar" });
      fileName = Orang.poto;
    } else {
      const filepath = `${orang.poto}`;
      fs.unlinkSync(filepath);
    }
    try {
      await Orang.update(
        {
          nama,
          provinsi,
          kota,
          poto: image,
          url,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      res.status(201).json({ msg: "data updated successfully" });
    } catch (error) {
      console.log(error.message);
    }
  }
);

app.use("/gambar", express.static(path.join(__dirname, "gambar")));

app.use(express.json());
app.use(UserRoute);
app.use(OrangRoute);

app.listen(5000, () => console.log("server is running on port 5000"));
