const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');


// User Registration
router.post('/register', UserController.registerUser);

// User Login
router.post('/login', UserController.loginUser);


module.exports = router;
