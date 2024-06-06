const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestCaseSchema = new Schema({
  problemId: {
    type: string,
    required: true,
  },
  testCases: [
    {
      input: String,
      expectedOutput: String,
    },
  ],
});

module.exports = mongoose.model("TestCase", TestCaseSchema);
