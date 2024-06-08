const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const generateInputFile = (language,input,foldername) => {

  const inputDir = path.join(__dirname, foldername);

if (!fs.existsSync(inputDir)) {
  fs.mkdirSync(inputDir, { recursive: true });
}
  const jobId = uuid();
  const filename = `${jobId}.txt`;

  const inputfilePath = path.join(inputDir, filename);

  if(language==="py")
    {
      const lines = input.split('\n');
      let processedInput = lines.map(line => line.split(' ').join('\n')).join('\n');
      fs.writeFileSync(inputfilePath, processedInput);
      return inputfilePath;
    }

  fs.writeFileSync(inputfilePath, input);
  return inputfilePath;
};

module.exports = { generateInputFile };
