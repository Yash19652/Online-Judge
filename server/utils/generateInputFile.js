const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const inputDir = path.join(__dirname, "inputs");

if (!fs.existsSync(inputDir)) {
  fs.mkdirSync(inputDir, { recursive: true });
}

const generateInputFile = (input) => {
  const jobId = uuid();
  const filename = `${jobId}.txt`;

  const inputfilePath = path.join(inputDir, filename);

  fs.writeFileSync(inputfilePath, input);
  return inputfilePath;
};

module.exports = { generateInputFile };
