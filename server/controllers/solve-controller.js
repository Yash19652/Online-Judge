require("dotenv").config();
const { generateFile } = require("../utils/generateFile");
// const {executeCpp , executeJava , executePy} = require("../utils/executeFile")
const { executeCpp, executeJava, executePy } = require("../utils/executeFile");
const { generateInputFile } = require("../utils/generateInputFile");
const { compareFiles } = require("../utils/compareFiles");
const Problems = require("../Model/Problems");

const runSolution = async (req, res) => {
  const { language = "cpp", code, input } = req.body;
  if (code === undefined) {
    return res.status(500).json({ success: false, error: "code undefined" });
  }
  if (language === "" || language.trim() === "") {
    return res
      .status(500)
      .json({ success: false, error: "language undefined" });
  }
  // return res.json(language,input,code)

  try {
    const filePath = await generateFile(language, code , "codes");
    const inputFilePath = await generateInputFile(input);
    let output;
    switch (language) {
      case "cpp":
        output = await executeCpp(filePath, inputFilePath);
        break;
      case "py":
        output = await executePy(filePath, inputFilePath);
        break;
      case "java":
        output = await executeJava(filePath, inputFilePath);
        break;
      default:
        throw new Error("Unsupported language");
    }

    res.json({output});
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const submitSolution = async (req, res) => {
  const { language = "cpp", code ,probId} = req.body;

  try {
    var problem = await Problems.findOne({ probId: probId });
    
  } catch (error) {
    console.log("cannot get the test case",error)
  }

  try{
  const TC = problem.TC;
  const TCinput = TC.TCinput;
  const TCoutput = TC.TCoutput;
  
  const inputPath = generateFile("txt",TCinput,"TCinput");
  const expectedOutputPath = generateFile("txt",TCoutput,"TCoutput");

  const filePath = await generateFile(language, code , "codes");

  let output;
    switch (language) {
      case "cpp":
        output = await executeCpp(filePath, inputPath);
        break;
      case "py":
        output = await executePy(filePath, inputPath);
        break;
      case "java":
        output = await executeJava(filePath, inputPath);
        break;
      default:
        throw new Error("Unsupported language");
    }

    const outputPath = generateFile("txt",output,"generatedOutput");

    const result = compareFiles(outputPath,expectedOutputPath);

    console.log(result);
    res.status(200).json({result});
  }
  catch(error){
    console.log(error);
  }


};

module.exports = { runSolution, submitSolution };
