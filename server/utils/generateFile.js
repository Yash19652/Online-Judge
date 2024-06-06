const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");



const generateFile = (language, code ,folderName) => {

  const dirCodes = path.join(__dirname, folderName);

  if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

  const jobId = uuid();
  const filename = `${jobId}.${language}`;

  const filePath = path.join(dirCodes, filename);

  fs.writeFileSync(filePath, code);
  return filePath;
};

module.exports = { generateFile };
