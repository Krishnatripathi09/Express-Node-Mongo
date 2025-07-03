const validator = require("validator");

const validateSignUpData = (req, res) => {
  const { userName, password, role } = req.body;

  if (!userName || userName.length < 3 || userName.length > 15) {
    throw new Error("Username should be between 3 and 15 characters");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter a Strong password");
  }
};

module.exports = {
  validateSignUpData,
};
