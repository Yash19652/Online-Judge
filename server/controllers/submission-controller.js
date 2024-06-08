const Submission = require("../Model/Submissions");
const User = require("../Model/Users")

const getSubmissions = async (req, res) => {
  const { probId } = req.body;

  if (!probId) {
    return res.status(400).json({ error: "userId and probId are required" });
  }

  const userId = req.userId; 
  
  
  if (!userId) {
    return res.status(401).json({ error: "No userId found" });
  }

  try {
    const submissions = await Submission.find({ userId, probId });
    res.json(submissions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching submissions" });
  }
};

module.exports = { getSubmissions };
