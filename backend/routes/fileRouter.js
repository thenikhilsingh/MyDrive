const Router = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const { getFiles } = require("../controllers/fileController.js");

const fileRouter = Router();

fileRouter.get("/", authMiddleware, getFiles);
fileRouter.get("/upload", authMiddleware);

module.exports = fileRouter;
