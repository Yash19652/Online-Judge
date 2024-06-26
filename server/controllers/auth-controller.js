const User = require("../Model/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require('dotenv').config()

registerUser = async (req, res) => {
  try {
    //get all data from frontend
    const { firstname, lastname, email, password, role } = req.body;

    //validations

    if (!firstname || firstname.trim() === "") {
      res.status(400).send({ error: "First name is required" });
    }

    if (!lastname || lastname.trim() === "") {
      res.status(400).send({ error: "Last name is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim() === "") {
      res.status(400).send({ error: "Email is required" });
    } else if (!emailRegex.test(email)) {
      res.status(400).send({ error: "Invalid email format" });
    }

    if (!password || password.trim() === "") {
      res.status(400).send({ error: "Password is required" });
    } else if (password.length < 6) {
      res
        .status(400)
        .send({ error: "Password must be at least 6 characters long" });
    } else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:<,.>?]).{6,}$/;
      if (!passwordRegex.test(password)) {
        res
          .status(400)
          .send({
            error:
              "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one symbol",
          });
      }
    }

    //check if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).send({ error: "User already exist" });
    }

    //hashing/encryption of pwd

    const hashedPassword = await bcrypt.hash(password, 10);

    //save user in dB
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
    });
    //gen a token
    //JWT TOKEN = 1.Header 2.Payload 3.Signature
    // const token = jwt.sign(
    //   { id: User._id, email },
    //   process.env.JWT_SECRET_KEY,
    //   {
    //     expiresIn: "2h",
    //   }
    // );

    // user.token = token;
    // user.password = undefined;

    res.status(200).json({ message: "User Registered Successfully", user });
  } catch (error) {
    console.log(error);
  }
};

loginUser = async (req, res) => {
  try {
    //get all data from frontend
    const { email, password, role } = req.body;

    if (!email || email.trim() === "" || !password || password.trim() === "") {
      res.status(400).send({ error: "Enter all details" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).send({ error: "Invalid Password" });
    }

    if (role != user.role) {
      res.status(400).send({ error: "Please Select appropriate role" });
    }

    const token = jwt.sign(
      { id: user._id, email: email , role:user.role},
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2d" }
    );
    user.token = token;
    user.password = undefined;

    //store token in cookies
    const options = {
      expiresIn: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true, //only server will be able to manipulate
      secure: true, // only if using HTTPS
      sameSite: 'None' // necessary for cross-origin cookies
    };

    res.status(200).cookie("token", token, options).json({
      message: "Successfully LoggedIn",
      success: true,
      token,
      user:user,
    });
  } catch (error) {
    console.log(error);
  }
};

logoutUser = async (req,res) => {
    res.clearCookie("token");
    res.json({message : "token cleared"})
};

module.exports = { registerUser, loginUser , logoutUser};
