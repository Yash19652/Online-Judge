const mongoose = require("mongoose");

const exampleTestCaseSchema = new mongoose.Schema({
    input: {
      type: String,
      required: true
    },
    output: {
      type: String,
      required: true
    }
  }, { _id : false });

const problemSchema = new mongoose.Schema({
    probId: {
        type: String,
        default: null,
        unique : true,
        required:true,
    },
    probName: {
        type: String,
        default: null,
        required:true,
    },
    probStatement:{
        type: String,
        default: null,
        required:true,
    },
    difficulty: {
        type: String,
        required:true,
        enum: ['easy','medium','hard'],
        default : 'easy',
    },
    topic: {
        type: String,
        required:true,
    },
    companyAsked:{
        type: [String],
        default : [],
    },
    ex_TC:{
        type : [exampleTestCaseSchema],
        required : true,
    }

});

module.exports = mongoose.model("Problem", problemSchema);