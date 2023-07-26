const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const { sendCookies } = require("../utils/features.js");

module.exports.getAllUser = async (req, res) => {};

module.exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.json({
      success: false,
      message: "User Exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12, process.env.password);

  user = await User.create({ name, email, password: hashedPassword });

  sendCookies(user, res, "User Created", 201);
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Not Found",
    });
  }

  const compere = await bcrypt.compare(password, user.password);

  if (!compere) {
    return res.status(404).json({
      success: false,
      message: "Invalid Credential",
    });
  }

  sendCookies(user, res, `Welcome Back ${user.name}`, 200);
};

module.exports.getMyProfile = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

module.exports.logout = async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User Logout",
    });
};
