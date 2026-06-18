const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization"); //header me authorization se token mil gya
  if (!token) {
    res.status(401).json({
      message: "Unauthorized HTTP, Token not provided!",
    });
  }

  const jwtToken = token.replace("Bearer", "").trim(); //token me se bearer nikaal diya

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY); //ye verify karega token ko
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    req.user = userData; //created custom property to get user data
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized. Invalid Token!" });
  }
};

module.exports = authMiddleware;
