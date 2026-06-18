const Router = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getFolders,
  createFolder,
  renameFolder,
  deleteFolder,
} = require("../controllers/folderController");

const folderRouter = Router();

folderRouter.get("/", authMiddleware, getFolders);
folderRouter.post("/create", authMiddleware, createFolder);
folderRouter.put("/rename/:id", authMiddleware, renameFolder);
folderRouter.delete("/delete/:id", authMiddleware, deleteFolder);

module.exports = folderRouter;
