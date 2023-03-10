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
  const {name,email,password} = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await user.findOne({email});
    if(oldUser){
      return res.send({ error: "User Exists"})
    }
    await user.create({
      name,
      email,
      password:encryptedPassword
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
    const token = jwt.sign({}, JWT_SECRET);

    if(res.status(201)) {
      return res.json({status: "Ok", data: token});
    } else {
      return res.json({ error: "error"});
    }
  }
  res.json({ status: "error", error: "Invalid Password"});
})

app.listen(5000, () => {
  console.log("server started")
});
