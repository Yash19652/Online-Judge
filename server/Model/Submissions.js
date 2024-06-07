const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  probId: {
    type: String,
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
  Accepted: {
    type: Boolean,
    required: false,
  },
  testCasesPassed: {
    type: String,
    default: "0",
  },
});

module.exports = mongoose.model("Submission", SubmissionSchema);
