const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log("Token :- ", token);
  if (!token) {
    return res.status(401).json({ message: "Access Denied." });
  }
  const tokenWithoutBearer = token.split(" ")[1];
  console.log("token Without Bearer :- ", tokenWithoutBearer);
  try {
    const decodedToken = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch {
    res.status(403).json({ message: "Invalid Token" });
  }
};

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: "All fields are required." });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User registered.", user: savedUser });
  } catch (err) {
    res.status(500).json({ message: "Registration failed.", error: err });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ message: "All fields (Email and Password) are required." });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User Not Found!" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Password." });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login Failed. ", error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
