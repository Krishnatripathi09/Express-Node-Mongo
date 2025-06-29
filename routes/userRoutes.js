const express = require("express");
const { adminAuth } = require("../middlewares/authMiddleware");
const authorizedRoles = require("../middlewares/roleMiddleware");

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
  (req, res) => {
    res.json({ message: "This is User Route" });
  }
);

module.exports = router;
