const File = require("../models/file.js");

const getFiles = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const files = await File.find({ uploadedBy: loggedInUserId });
    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const uploadFile = async (req, res) => {
  try {
    // Check file exists
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a file",
      });
    }

    const newFile = await File.create({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
      fileUrl: `/uploads/${req.file.filename}`, //local file path
      publicId: req.file.filename, //temporary for local storage
      uploadedBy: req.user._id,
      folder: req.body.folderId,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      file: newFile,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { getFiles, uploadFile };
