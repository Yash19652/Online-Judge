const jwt = require("jsonwebtoken");
require('dotenv').config()

const verifyJWT = (req,res,next) =>{

    const token = req.cookies.token;
    if(!token) return res.status(401).json({message : "Not Authorized User"});

    jwt.verify(token , 
        process.env.JWT_SECRET_KEY , 
        (err,decodedToken) =>{
            if(err) return res.status(401).json({message:"Invalid Token"});

            req.role = decodedToken.role;//what we sent in the sign of token during login
            next();

    })
    

}

module.exports = verifyJWT;
