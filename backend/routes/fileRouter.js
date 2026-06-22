const Router = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const {
  getFiles,
  getFolderFiles,
  uploadFile,
  deleteFile,
  getFileInfo,
  downloadFile,
} = require("../controllers/fileController.js");
const upload = require("../middlewares/multerMiddleware.js");

const fileRouter = Router();

fileRouter.get("/", authMiddleware, getFiles);
fileRouter.get("/info/:id", authMiddleware, getFileInfo);
fileRouter.get("/:id", authMiddleware, getFolderFiles);
fileRouter.post("/upload", authMiddleware, upload.single("file"), uploadFile);
fileRouter.delete("/delete/:id", authMiddleware, deleteFile);
fileRouter.get("/download/:id", authMiddleware, downloadFile);

module.exports = fileRouter;
