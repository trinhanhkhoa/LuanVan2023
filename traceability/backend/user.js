const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name:String,
    email:{ type: String, unique: true },
    password:String
  },
  {
    collection: "userAccount"
  }
);

mongoose.model("userAccount", userSchema);