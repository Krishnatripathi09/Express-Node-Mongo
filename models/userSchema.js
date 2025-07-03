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
    validate(value) {
      if (!["admin", "manager", "user"].includes(value)) {
        throw new Error("Only admin,manager and user roles allowed");
      }
    },
    enum: ["admin", "manager", "user"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
