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

module.exports = { getFiles };
