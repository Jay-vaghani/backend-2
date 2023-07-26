const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "backend_api",
    })
    .then(() => {
      console.log("Connected to database");
    });
};

module.exports = connectDB;
