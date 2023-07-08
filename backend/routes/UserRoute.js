import express from "express";
import { getUser, addUser } from "../controller/UserController.js";

const router = express.Router();

router.post("/api/data/user", getUser);
router.post("/api/data/adduser", addUser);

export default router;
