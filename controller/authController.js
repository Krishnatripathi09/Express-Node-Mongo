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

module.exports = {
  register,
};
