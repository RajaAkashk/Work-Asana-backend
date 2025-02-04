const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authenticateJWT = UserController.authenticateJWT;
const User = require("../models/users.model");

// User Registration
router.post("/register", UserController.registerUser);

// User Login
router.post("/login", UserController.loginUser);

//User Profile
router.get("/profile", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Error in fetching user data.", error: err.message });
  }
});

router.get("/", UserController.getUsers);

module.exports = router;
