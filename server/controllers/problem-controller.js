const Problems = require("../Model/Problems");

// you can find the role by req.role (because using verifyJWT middleware)

const getProblemList = async (req, res) => {
  try {
    const data = await Problems.find({});
    
    res.status(200).json({data , role:req.role});
  } catch (error) {
    console.log("Error in getProblemList API to get list of problems");
  }
};

const createProblem = async (req, res) => {

  console.log(req.body);
  try {
    const {
      probId,
      probName,
      probStatement,
      difficulty,
      topic,
      companyAsked,
      input1,
      output1,
      input2,
      output2,
      TCinput,
      TCoutput,
    } = req.body;

    if (
      !(probId && probName && probStatement && difficulty && topic && input1 && input2 && output1 && output2 && TCinput && TCoutput)
    ) {
      res.status(400).json({ message: "Please enter all neccessary details" });
    }
    const ex_TC = [{input:input1,output:output1},{input:input2,output:output2}]
    const Companies_Asked = companyAsked.split(",")
    const TC = {TCinput:TCinput,TCoutput:TCoutput}

    const existingId = await Problems.findOne({ probId });
    if (existingId) {
      res.status(400).json({ message: "Choose another problem ID" });
    }

    const existingproblem = await Problems.findOne({ probName });
    if (existingproblem) {
      res.status(400).json({ message: "Problem already exist" });
    }

    const problem = await Problems.create({
      probId,
      probName,
      probStatement,
      difficulty,
      topic,
      companyAsked:Companies_Asked,
      ex_TC,
      TC:TC,
    });

    res.status(200).json({ message: "Problem Added Successfully" });
  } catch (error) {
    res
      .status(400)
      .json({
        message: "error in creatProblem API to create a problem",
        error: error,
      });
  }
};

const updateProblem = async (req, res) => {
  try {
    const {
      _id,
      probId,
      probName,
      probStatement,
      difficulty,
      topic,
      companyAsked,
      input1,
      output1,
      input2,
      output2,
    } = req.body;
    
    const ex_TC = [{input:input1,output:output1},{input:input2,output:output2}]
    const Companies_Asked = companyAsked.split(",")
    const problem = await Problems.updateOne(
      { _id: _id },
      {
        $set: {
          probId: probId,
          probName: probName,
          probStatement: probStatement,
          difficulty: difficulty,
          topic: topic,
          companyAsked: Companies_Asked,
          ex_TC: ex_TC,
        },
      }
    );
    if (!problem) {
      res
        .status(400)
        .json({ message: "Problem with given ID not found to update" });
    }

    res
      .status(200)
      .json({ message: "Problem updated successfully", data: problem });
  } catch (error) {
    res.status(400).json({ message: "error in updateProblem API" , error : error });
  }
};

const deleteProblem = async (req, res) => {
  const { _id } = req.body;
  // console.log(req.body)
  try {
    const problem = await Problems.deleteOne({ _id: _id });

    if (problem.deletedCount === 0) {
        return res.status(400).json({ message: "Problem with given ID not found to delete" , ID : _id });
      }

    res.status(200).json({message : "Problem deleted successfully"})
  } catch (error) {
    res.status(400).json({ message: "error in deleteProblem API" , error : error});
  }
};

module.exports = { getProblemList, createProblem, updateProblem , deleteProblem};
