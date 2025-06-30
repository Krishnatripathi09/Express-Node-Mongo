const express = require("express");
const multer = require("multer");
const path = require("path");
const fileUpload = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

fileUpload.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please Provide the File" });
    } else {
      res.status(200).json({ message: "File Uploaded SuccessFully" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error Occured", err });
  }
});

module.exports = {
  fileUpload,
};
