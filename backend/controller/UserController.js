import User from "../models/Usermodel.js";

export const getUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await User.findOne({
      where: {
        username: username,
        password: password,
      },
    });
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};
export const addUser = async (req, res) => {
  const { nama, username, password } = req.body;
  try {
    const response = await User.create({
      nama: nama,
      username: username,
      password: password,
    });
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};
