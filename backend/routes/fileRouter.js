const Router = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const {
  getFiles,
  uploadFile,
  deleteFile,
} = require("../controllers/fileController.js");
const upload = require("../middlewares/multerMiddleware.js");

const fileRouter = Router();

fileRouter.get("/", authMiddleware, getFiles);
fileRouter.post("/upload", authMiddleware, upload.single("file"), uploadFile);
fileRouter.delete("/delete/:id", authMiddleware, deleteFile);

module.exports = fileRouter;
