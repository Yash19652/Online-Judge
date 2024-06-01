require("dotenv").config();
const { generateFile } = require("../utils/generateFile");
// const {executeCpp , executeJava , executePy} = require("../utils/executeFile")
const { executeCpp, executeJava, executePy } = require("../utils/executeFile");
const { generateInputFile } = require("../utils/generateInputFile");

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

  try {
    const filePath = await generateFile(language, code);
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

    res.json({output });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const submitSolution = async (req, res) => {
  console.log("submitted");
};

module.exports = { runSolution, submitSolution };
