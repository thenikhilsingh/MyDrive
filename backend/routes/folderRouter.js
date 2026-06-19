const Router = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getFolders,
  createFolder,
  renameFolder,
  deleteFolder,
  getFolderById,
} = require("../controllers/folderController");

const folderRouter = Router();

folderRouter.get("/", authMiddleware, getFolders);
folderRouter.get("/:id", authMiddleware, getFolderById);
folderRouter.post("/create", authMiddleware, createFolder);
folderRouter.put("/rename/:id", authMiddleware, renameFolder);
folderRouter.delete("/delete/:id", authMiddleware, deleteFolder);

module.exports = folderRouter;
