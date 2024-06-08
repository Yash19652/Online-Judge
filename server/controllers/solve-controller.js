require("dotenv").config();
const { generateFile } = require("../utils/generateFile");
// const {executeCpp , executeJava , executePy} = require("../utils/executeFile")
const { executeCpp, executeJava, executePy } = require("../utils/executeFile");
const { generateInputFile } = require("../utils/generateInputFile");
const { compareFiles } = require("../utils/compareFiles");
const Problems = require("../Model/Problems");
const Submissions = require("../Model/Submissions");
const User = require("../Model/Users");

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
    const inputFilePath = await generateInputFile(language,input,"inputs");
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
  
  const inputPath = generateInputFile(language,TCinput,"TCinput");
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

    res.status(200).json({result});
    
    const userId = req.userId;
    console.log(userId)
    const Accepted = result.verdict;
    const testCasesPassed = Accepted ? result.lineNo:(result.lineNo)-1 ;

    try {
      const problem = await Submissions.create({
        userId,
        probId,
        language,
        code,
        Accepted,
        testCasesPassed,
      });

      if(Accepted)
        {
          // add in solved problems
          try {
            await User.updateOne(
              { _id: userId },
              { $addToSet: { solvedProblems: probId } }
          );
          console.log('Solved problem added successfully.');

          } catch (error) {
            console.log("error in marking problem as solved",error)
          }
        }


    } catch (error) {
      console.log({message:"error in registering the submission",error:error});
      res.json({error});
    }

  }
  catch(error){
    console.log({message:"error in submitting the problem",error:error});
    res.json({error})

    try {

    userId = req.userId;
    const Accepted = false;
    const testCasesPassed = 0 ;

      const problem = await Submissions.create({
        userId,
        probId,
        language,
        code,
        Accepted,
        testCasesPassed,
      });


    } catch (error) {
      console.log({message:"error in registering the submission",error:error});
      res.json({error})
    }

  }


};

module.exports = { runSolution, submitSolution };
