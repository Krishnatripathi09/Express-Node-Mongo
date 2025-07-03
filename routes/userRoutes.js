const express = require("express");
const { adminAuth } = require("../middlewares/authMiddleware");
const authorizedRoles = require("../middlewares/roleMiddleware");
const User = require("../models/userSchema");

const router = express.Router();

router.get("/admin", adminAuth, authorizedRoles("admin"), (req, res) => {
  res.json({ message: "This is Admin Route" });
});

router.get(
  "/manager",
  adminAuth,
  authorizedRoles("admin", "manager"),
  (req, res) => {
    res.json({ message: "This is Manager Route" });
  }
);
console.log("I am User Route");
router.get(
  "/user",
  adminAuth,
  authorizedRoles("admin", "manager", "user"),
  async (req, res) => {
    const userId = req.user.id;
    console.log(userId);
    const loggedInUser = await User.findOne({ id });
    console.log(loggedInUser);
  }
);

module.exports = router;
