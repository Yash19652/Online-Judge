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

    const problem = await Problems.create({
        probId,
        probName,
        probStatement,
        difficulty,
        topic,
        companyAsked,
        ex_TC,
    });

    res.status(200).json({message : "Problem Added Successfully"})
  } catch (error) {
    res.status(400).json({message: "error in creatProblem API to create a problem",error : error});
  }
};

module.exports = { getProblemList, createProblem };
