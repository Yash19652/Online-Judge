const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { DBConnection } = require("./Database/db");
const dotenv = require("dotenv");
const User = require("./Model/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors")
dotenv.config();

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

DBConnection(); // Assuming this is where the error occurs

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  try {
    //get all data from frontend
    const { firstname, lastname, email, password } = req.body;

    //validations
    
    if (!firstname || firstname.trim() === "") {
      res.status(400).send({ error :"First name is required" }) 
    }

    if (!lastname || lastname.trim() === "") {
      res.status(400).send({ error : "Last name is required" }) 
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim() === "") {
      res.status(400).send({ error:"Email is required"})
    } else if (!emailRegex.test(email)) {
      res.status(400).send({ error : "Invalid email format"}) 
    }

    if (!password || password.trim() === "") {
      res.status(400).send({ error:"Password is required" }) 
    } else if (password.length < 6) {
      res.status(400).send({ error : "Password must be at least 6 characters long"}) ;
    } else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:<,.>?]).{6,}$/;
      if (!passwordRegex.test(password)) {
        res.status(400).send({ error : "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one symbol" })
          
      }
    }

    //check if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).send({error : "User already exist"});
    }

    //hashing/encryption of pwd

    const hashedPassword = await bcrypt.hash(password, 10);

    //save user in dB
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    //gen a token
    //JWT TOKEN = 1.Header 2.Payload 3.Signature
    const token = jwt.sign(
      { id: User._id, email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;
    user.password = undefined;

    res.status(200).json({ message: "User Registered Successfully", user });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    //get all data from frontend
    const { email, password } = req.body;

    if (!email || email.trim() === "" || !password || password.trim() === "") {
      res.status(400).send({error : "Enter all details"});
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send({error : "User not found"});
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).send({error : "Invalid Password"});
    }

    const token = jwt.sign(
      { id: User._id, email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2h" }
    );
    user.token = token;
    user.password = undefined;

    //store token in cookies
    const options = {
      expiresIn : new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly : true //only server will be able to manipulate
    }

    res.status(200).cookie("token",token,options).json({
      message:"Successfully LoggedIn",
      success: true,
      token,
    });

  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
