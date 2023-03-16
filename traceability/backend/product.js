const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    id:Number,
    name:String,
    pId:{ type: String, unique: true, index: true, sparse:true},
    status:Boolean,
    time:String,
    // image:String,
    address:String,
    detail:String,
    description:String
  },
  {
    collection: "products"
  }
);

mongoose.model("products", productsSchema); 