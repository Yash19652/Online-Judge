const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { DBConnection } = require("./Database/db");
const dotenv = require("dotenv");
const User = require("./Model/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(express.json());

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
    const errors = {};
    if (!firstname || firstname.trim() === "") {
      errors.firstname = "First name is required";
    }

    if (!lastname || lastname.trim() === "") {
      errors.lastname = "Last name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim() === "") {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password || password.trim() === "") {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    } else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:<,.>?]).{6,}$/;
      if (!passwordRegex.test(password)) {
        errors.password =
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one symbol";
      }
    }
    if (Object.keys(errors).length > 0) {
      res.status(400).send({ errors });
    }

    //check if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).send("User already exist");
    }

    //hashing/encryption of pwd

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(process.env.SECRET_KEY, salt);

    //save user in dB
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    //gen a token
    const options = {
      expiresIn: "2h",
    };
    const token = jwt.sign(
      { id: User._id, email },
      process.env.JWT_SECRET_KEY,
      options
    );

    user.token = token;
    user.password = undefined;

    res.status(200).json({message:"User Registered Successfully",user});

  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
