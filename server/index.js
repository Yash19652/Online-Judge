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
const authRouter = require("./routes/auth")
const problemsListRouter = require("./routes/problemList")
const solveRouter = require("./routes/solveRouter")
const submissionRouter = require("./routes/submissionRouter")
const verifyJWT = require("./middlewares/verifyJWT");

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:process.env.FRONTEND_URL,
  methods:["GET","POST"],
  credentials:true

}));
app.use(bodyParser.urlencoded({ extended: true }));

DBConnection(); 

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", authRouter) 

// app.use(verifyJWT)
app.use("/problemList",verifyJWT,problemsListRouter)
app.use("/solve",verifyJWT,solveRouter)
app.use("/getSubmissions",verifyJWT,submissionRouter)


app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
