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

const fileFilter = (req, file, cb) => {
  try {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

    if (allowedTypes.includes(file.mimeType)) {
      cb(null, true);
    } else cb(new Error("only image and pdf files allowed"));
  } catch (err) {
    res.status(400).send("Only images and pdf Files Allowed");
  }
};

const upload = multer({ storage: storage, fileFilter });

fileUpload.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please Provide the File" });
    } else {
      res.status(200).json({ message: "File Uploaded SuccessFully" });
    }
  } catch (err) {
    res.status(400).json({ message: "Error Occured" });
  }
});

module.exports = {
  fileUpload,
};
