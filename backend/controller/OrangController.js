import Orang from "../models/Orangmodel.js";
import { Op } from "sequelize";

import fs from "fs";

export const getOrang = async (req, res) => {
  try {
    const response = await Orang.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const getOrangById = async (req, res) => {
  try {
    const response = await Orang.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const getOrangByName = async (req, res) => {
  try {
    const response = await Orang.findAll({
      where: {
        // nama: req.params.nama,
        nama: { [Op.like]: `%${req.params.nama}%` },
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteOrang = async (req, res) => {
  const orang = await Orang.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!orang) return res.status(404).json({ msg: "not found" });
  try {
    const filepath = `${orang.poto}`;
    fs.unlinkSync(filepath);
    await Orang.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ msg: "data deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
