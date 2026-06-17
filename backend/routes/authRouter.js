const Router = require("express");
const { signup } = require("../controllers/authController");

const authRouter = Router();

authRouter.put("/signup", signup);

module.exports = authRouter;
