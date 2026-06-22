const Folder = require("../models/folder");
const File = require("../models/file.js");
const fs = require("fs");
const path = require("path");
const cloudinary = require("../utils/cloudinary.js");

const getFolders = async (req, res) => {
  try {
    const userData = req.user;
    const allFolders = await Folder.find({ createdBy: userData._id }).populate(
      "createdBy",
      "name",
    );
    res
      .status(200)
      .json({ message: "folders fetched successfully", allFolders });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFolderById = async (req, res) => {
  try {
    const { id } = req.params;
    const folder = await Folder.findOne({
      _id: id,
      createdBy: req.user._id,
    });

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    res.status(200).json(folder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFolder = async (req, res) => {
  try {
    const { name } = req.body;
    const userData = req.user;
    const createdFolder = await Folder.create({
      name,
      createdBy: userData._id,
    });
    res
      .status(201)
      .json({ message: "folder created successfully", createdFolder });
  } catch (error) {
    res.status(400).json({ message: "folder creation failed" });
  }
};

const renameFolder = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const renamedFolder = await Folder.findOneAndUpdate(
      {
        _id: id,
        createdBy: req.user._id,
      },
      {
        name,
      },
      {
        new: true,
      },
    );
    res.status(200).json({
      message: "Folder renamed successfully",
      renamedFolder,
    });
  } catch (error) {
    res.status(400).json({ message: "folder rename failed" });
  }
};

const getResourceType = (mimeType) => {
  if (mimeType.startsWith("image")) return "image";
  if (mimeType.startsWith("video")) return "video";

  return "raw";
};
const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFolder = await Folder.findOneAndDelete({
      _id: id,
      createdBy: req.user._id,
    });
    const FilesInsideTheFolder = await File.find({
      folder: id,
      uploadedBy: req.user._id,
    });

    // FilesInsideTheFolder.forEach((file) => {
    //   const filePath = path.join("public", file.fileUrl);
    //   if (fs.existsSync(filePath)) {
    //     fs.unlinkSync(filePath);
    //   }
    // });
    for (const file of FilesInsideTheFolder) {
      await cloudinary.uploader.destroy(file.publicId, {
        resource_type: getResourceType(file.type),
      });
    }
    const deletedFilesInsideTheFolder = await File.deleteMany({
      folder: id,
      uploadedBy: req.user._id,
    });
    res.status(200).json({
      message: "Folder deleted successfully",
      deletedFolder,
      deletedFilesInsideTheFolder,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "folder deletion failed", error: error.message });
  }
};

module.exports = {
  getFolders,
  getFolderById,
  createFolder,
  renameFolder,
  deleteFolder,
};
