const Problems = require("../Model/Problems");

const getProblemList = async (req, res) => {
  try {
    const data = await Problems.find({});
    res.status(200).json(data);
  } catch (error) {
    console.log("Error in getProblemList API to get list of problems");
  }
};

const createProblem = async (req, res) => {
  try {
    const {
      probId,
      probName,
      probStatement,
      difficulty,
      topic,
      companyAsked,
      ex_TC,
    } = req.body;

    if (
      !(probId && probName && probStatement && difficulty && topic && ex_TC)
    ) {
      res.status(400).send({ message: "Please enter all neccessary details" });
    }

    const existingId = await Problems.findOne({ probId });
    if (existingId) {
      res.status(400).send({ message: "Choose another problem ID" });
    }

    const existingproblem = await Problems.findOne({ probName });
    if (existingproblem) {
      res.status(400).send({ message: "Problem already exist" });
    }

    const problem = await Problems.create({
      probId,
      probName,
      probStatement,
      difficulty,
      topic,
      companyAsked,
      ex_TC,
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
      id,
      probId,
      probName,
      probStatement,
      difficulty,
      topic,
      companyAsked,
      ex_TC,
    } = req.body;

    const problem = await Problems.updateOne(
      { _id: id },
      {
        $set: {
          probId: probId,
          probName: probName,
          probStatement: probStatement,
          difficulty: difficulty,
          topic: topic,
          companyAsked: companyAsked,
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
      .status("200")
      .json({ message: "Problem updated successfully", data: problem });
  } catch (error) {
    res.status(400).json({ message: "error in updateProblem API" , error : error });
  }
};

const deleteProblem = async (req, res) => {
  const { id } = req.body;
  try {
    const problem = await Problems.deleteOne({ _id: id });

    if (problem.deletedCount === 0) {
        return res.status(400).json({ message: "Problem with given ID not found to delete" });
      }

    res.status(200).json({message : "Problem deleted successfully"})
  } catch (error) {
    res.status(400).json({ message: "error in deleteProblem API" , error : error});
  }
};

module.exports = { getProblemList, createProblem, updateProblem , deleteProblem};
