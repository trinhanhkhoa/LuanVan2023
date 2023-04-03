const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "ajhd1jasd08a9sdn1l[]120aklsd!@9//";


const mongoUrl = "mongodb+srv://takhoa19:Trinhanhkhoa2210@cluster0.sidm3eq.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser:true
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./user");

const user = mongoose.model("userAccount");
app.post("/signup", async(req, res) => {
  const {name,email,password,userType} = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await user.findOne({email});
    if(oldUser){
      return res.send({ error: "User Exists"})
    }
    await user.create({
      name,
      email,
      password:encryptedPassword,
      userType
    });
    res.send({status:"OK"})
  } catch (error) {
    res.send({status:"Error"})
  }
})

app.post("/signin", async(req, res) => {
  const {email, password} = req.body;

  const userLogin = await user.findOne({email});
  if(!userLogin) {
    return res.json({error: "User not found"});
  }

  if(await bcrypt.compare(password, userLogin.password)) {
    const token = jwt.sign({ email: userLogin.email }, JWT_SECRET, {
      expiresIn: 15000,
    });

    if(res.status(201)) {
      return res.json({status: "Ok", data: token});
    } else {
      return res.json({ error: "error"});
    }
  }
  res.json({ status: "error", error: "Invalid Password"});
})

app.post("/userinfo", async (req, res) => {
  const { token } = req.body;
  try {
    const userInfo = jwt.verify(token, JWT_SECRET, (err, res) => {
      if(err) {
        return "Token expired";
      }
      return res;
    });
    if(userInfo == "Token expired")
      return res.send({ status: "Error", data: "Token expired"});
    const userEmail = userInfo.email;
    user.findOne({ email: userEmail })
      .then((data) => {
      res.send({ status: "Ok", data:data });
    })
      .catch((error) => {
      res.send({ status: "error", data:error });
    });
  } catch (error) {
    
  }
})

app.post("/enhome", async (req, res) => {
  const { token } = req.body;
  try {
    const userInfo = jwt.verify(token, JWT_SECRET, (err, res) => {
      if(err) {
        return "Token expired";
      }
      return res;
    });
    if(userInfo == "Token expired")
      return res.send({ status: "Error", data: "Token expired"});
    const userEmail = userInfo.email;
    user.findOne({ email: userEmail })
      .then((data) => {
      res.send({ status: "Ok", data:data });
    })
      .catch((error) => {
      res.send({ status: "error", data:error });
    });
  } catch (error) {
    
  }
})

require("./product");
const products = mongoose.model("products");

app.post("/createqr", async(req, res) => {
  const {id,pId,name,time,address,image,description} = req.body;

  try {
    // const oldProduct = await products.findOne({id,pId});
    // if(oldProduct) {
    //   return res.send({ error: "Product Exists"})
    // }
    // await
    products.create({
      id,
      pId,
      name,
      time,
      address,
      image,
      description
    });
    res.send({status: "OK"})
  } catch (error) {
    res.send({ status: "Error"})
  }
})

require("./list");
const list = mongoose.model("list");

app.get("/list", async(req, res) => {
  try {
    const productItem = await list.find (); 
    res.send({ status: "Ok", data: productItem });
  } catch (error) {
    console.log(error)
  }
})

app.listen(5000, () => {
  console.log("server started")
});