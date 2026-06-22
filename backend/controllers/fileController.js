const File = require("../models/file.js");
const fs = require("fs");
const path = require("path");

const getFiles = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const files = await File.find({ uploadedBy: loggedInUserId });
    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFolderFiles = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUserId = req.user._id;
    const folderFiles = await File.find({
      folder: id,
      uploadedBy: loggedInUserId,
    });
    res.status(200).json({ folderFiles });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFileInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUserId = req.user._id;
    const fileInfo = await File.findOne({
      _id: id,
      uploadedBy: loggedInUserId,
    }).populate("folder", "name");
    res.status(200).json({ fileInfo });
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

const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFile = await File.findOneAndDelete({
      _id: id,
      uploadedBy: req.user._id,
    });
    if (!deletedFile) {
      return res.status(404).json({
        message: "File not found",
      });
    }
    const filePath = path.join("public", deletedFile.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    res.status(200).json({
      message: "File deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const downloadFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findOne({
      _id: id,
      uploadedBy: req.user._id,
    });

    if (!file) {
      return res.status(404).json({
        message: "File not found",
      });
    }
    const filePath = `./public${file.fileUrl}`;
    res.download(filePath, file.name);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getFiles,
  getFolderFiles,
  uploadFile,
  deleteFile,
  getFileInfo,
  downloadFile,
};
