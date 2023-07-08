import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Orang = db.define(
  "orang",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nama: DataTypes.STRING,
    provinsi: DataTypes.STRING,
    kota: DataTypes.STRING,
    poto: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Orang;

(async () => {
  await db.sync();
})();
