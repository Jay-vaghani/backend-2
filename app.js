const express = require("express");
const app = express();
const userRouter = require("./routes/user.js");
const cookieParser = require("cookie-parser");




app.use(express.json());
app.use(cookieParser())
app.use("/users", userRouter);

module.exports = app
