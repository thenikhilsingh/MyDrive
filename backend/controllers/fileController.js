const File = require("../models/file.js");
const fs = require("fs");
const path = require("path");
const { uploadOnCloudinary, cloudinary } = require("../utils/cloudinary.js");

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

// const uploadFile = async (req, res) => {
//   try {
//     // Check file exists
//     if (!req.file) {
//       return res.status(400).json({
//         message: "Please upload a file",
//       });
//     }

//     const newFile = await File.create({
//       name: req.file.originalname,
//       type: req.file.mimetype,
//       size: req.file.size,
//       fileUrl: `/uploads/${req.file.filename}`, //local file path
//       publicId: req.file.filename, //temporary for local storage
//       uploadedBy: req.user._id,
//       folder: req.body.folderId,
//     });

//     res.status(201).json({
//       message: "File uploaded successfully",
//       file: newFile,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };
const uploadFile = async (req, res) => {
  try {
    const localPath = req.file?.path;

    if (!localPath) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const uploadedFile = await uploadOnCloudinary(localPath);
    if (!uploadedFile) {
      return res.status(400).json({
        message: "Upload failed",
      });
    }
    const newFile = await File.create({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,

      fileUrl: uploadedFile.secure_url, //only changed this

      publicId: uploadedFile.public_id, //only changed this

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

// const deleteFile = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedFile = await File.findOneAndDelete({
//       _id: id,
//       uploadedBy: req.user._id,
//     });
//     if (!deletedFile) {
//       return res.status(404).json({
//         message: "File not found",
//       });
//     }
//     const filePath = path.join("public", deletedFile.fileUrl);
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     }
//     res.status(200).json({
//       message: "File deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };

const getResourceType = (mimeType) => {
  if (mimeType.startsWith("image")) return "image";
  if (mimeType.startsWith("video")) return "video";

  return "raw";
};
const deleteFile = async (req, res) => {
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

    await cloudinary.uploader.destroy(file.publicId, {
      resource_type: getResourceType(file.type),
    });
    await File.findOneAndDelete({
      _id: id,
      uploadedBy: req.user._id,
    });
    res.status(200).json({
      message: "File deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
// const downloadFile = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const file = await File.findOne({
//       _id: id,
//       uploadedBy: req.user._id,
//     });

//     if (!file) {
//       return res.status(404).json({
//         message: "File not found",
//       });
//     }
//     const filePath = `./public${file.fileUrl}`;
//     res.download(filePath, file.name);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

module.exports = {
  getFiles,
  getFolderFiles,
  uploadFile,
  deleteFile,
  getFileInfo,
  downloadFile,
};
