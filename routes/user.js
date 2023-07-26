const express = require("express");
const {
  getAllUser,
  newUser,
  login,
  register,
  getMyProfile,
  logout,
} = require("../controllers/user.js");
const { isAuthenticated } = require("../middleware/auth.js");

const router = express.Router();

router.get("/all", getAllUser);

router.post("/login", login);

router.get("/logout", logout);

router.post("/new", register);

router.get("/me", isAuthenticated, getMyProfile);

module.exports = router;
