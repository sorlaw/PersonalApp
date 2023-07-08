import express from "express";
import {
  getOrang,
  getOrangById,
  deleteOrang,
  getOrangByName,
} from "../controller/OrangController.js";

const router = express.Router();

router.get("/orang", getOrang);
router.get("/orang/:id", getOrangById);
router.get("/orang/api/:nama", getOrangByName);
router.delete("/orang/:id", deleteOrang);

export default router;
