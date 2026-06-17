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

module.exports = { signup };
