const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "manager", "user"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
