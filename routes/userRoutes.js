const express = require("express");
const { adminAuth } = require("../middlewares/authMiddleware");
const authorizedRoles = require("../middlewares/roleMiddleware");
const { User } = require("../models/userSchema");

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

router.get(
  "/user",
  adminAuth,
  authorizedRoles("admin", "manager", "user"),
  async (req, res) => {
    const id = req.user.id;

    const loggedInUser = await User.findOne({ _id: id }).select(
      "userName role"
    );

    res.status(200).json({ loggedInUser });
  }
);

module.exports = router;
