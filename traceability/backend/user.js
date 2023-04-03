const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name:String,
    email:{ type: String, unique: true },
    password:String,
    userType: String,
    // list: {type: mongoose.Types.ObjectId, ref: "list"}
  },
  {
    collection: "userAccount"
  }
);

mongoose.model("userAccount", userSchema);