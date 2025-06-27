const { User } = require("../models/userSchema");
const bcrypt = require("bcrypt");
const register = async (req, res) => {
  try {
    const { userName, password, role } = req.body;

    if (!userName || !password || !role) {
      res.status(400).json({ message: "All the Fields are Required" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userData = User({
      userName,
      password: passwordHash,
      role,
    });

    await userData.save();

    res.status(201).json({ message: `User ${userName}, Created SuccessFully` });
  } catch (err) {
    res.status(400).json({ message: "Error Occured" + err });
  }
};

const login = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    res.status(400).json({ message: "Please Enter all the Details" });
  }

  const foundUser = await User.findOne({
    userName,
  });

  if (!foundUser) {
    res
      .status(404)
      .json({ message: "Please Enter Valid Credentials ==>User Not Found" });
  }

  const validPassword = await bcrypt.compare(password, foundUser.password);
  if (validPassword) {
    res.status(200).send("Logged-In Success-Fully");
  } else {
    res
      .status(400)
      .json({ message: "Please Enter Valid Credentials ==> Wrong Password" });
  }
};

module.exports = {
  register,
  login,
};
