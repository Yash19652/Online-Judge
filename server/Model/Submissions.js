const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  probId: {
    type: Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  submissionTime: {
    type: Date,
    default: Date.now,
  },
  results: 
    {
      verdict: Boolean,
      testCasesPassed: String,
    },
  
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
});

module.exports = mongoose.model("Submission", SubmissionSchema);
