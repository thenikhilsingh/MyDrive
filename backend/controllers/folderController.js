const Folder = require("../models/folder");

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

const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFolder = await Folder.findByIdAndDelete({
      _id: id,
      createdBy: req.user._id,
    });
    res.status(200).json({
      message: "Folder deleted successfully",
      deletedFolder,
    });
  } catch (error) {
    res.status(400).json({ message: "folder deletion failed" });
  }
};

module.exports = { getFolders, createFolder, renameFolder, deleteFolder };
