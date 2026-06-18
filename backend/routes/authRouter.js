const Router = require("express");
const { signup, login, user } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/user", authMiddleware, user);

module.exports = authRouter;
