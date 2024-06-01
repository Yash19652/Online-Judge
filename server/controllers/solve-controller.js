require('dotenv').config()
const {generateFile} = require('../utils/generateFile')
// const {executeCpp , executeJava , executePy} = require("../utils/executeFile")
const {executeCpp} = require('../utils/executeFile')
const {generateInputFile} = require('../utils/generateInputFile')

const runSolution = async (req,res) =>{

    const {language = "cpp" , code , input} = req.body
    if(code === undefined){
        return res.status(500).json({success:false, error:"code undefined"})
    }
    if(language === "" || language.trim()===""){
        return res.status(500).json({success:false, error:"language undefined"})
    }

    try {
        const filePath = await generateFile(language,code);
        const inputFilePath = await generateInputFile(input);
        const output = await executeCpp(filePath,inputFilePath) 

        res.json({language,code,output})  
        
    } catch (error) {
        res.status(500).json({success:false ,error})
    }

     

}

const submitSolution = async (req,res) =>{
    console.log("submitted");
}

module.exports={ runSolution , submitSolution }