const bcrypt = require("bcrypt");
const User = require("../models/user");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const userCreated = await User.create({
      name,
      email,
      password,
    });
    res.status(201).json({
      message: "User registered successfully!",
      token: userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: "user registeration failed!" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existedUser = await User.findOne({ email: email });
    if (!existedUser) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existedUser.password,
    );
    if (isValidPassword) {
      res.status(200).json({
        message: "login successfull!",
        token: existedUser.generateToken(),
        userId: existedUser._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password!" });
    }
  } catch (error) {
    res.status(500).json({ message: "login failed!" });
  }
};

module.exports = { signup, login };
