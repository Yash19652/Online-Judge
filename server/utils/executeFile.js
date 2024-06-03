const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filePath, inputFilePath) => {
  const jobId = path.basename(filePath).split(".")[0];
  const outputFileName = `${jobId}.exe`; // depends upon the environment
  const outPath = path.join(outputPath, outputFileName);

//   return new Promise((resolve, reject) => {
//     const command1 = `g++ ${filePath} -o ${outPath}`;
//     exec(command1,
//         (error,stdout,stderr) => {
//             if(error){
//                 reject(error)
//             }
//             if(stderr){
//                 reject(stderr)
//             }
//         }
//     )  
//     const command2 = `cd ${outputPath} && .\\${outputFileName} < ${inputFilePath}`;
//     exec(command2,
//         (error,stdout,stderr) => {
//             if(error){
//                 reject(error)
//             }
//             if(stderr){
//                 reject(stderr)
//             }
//             resolve(stdout.replace(/\r\n/g, ''));
//         }
//     )

//   });

return new Promise((resolve, reject) => {
    const command1 = `g++ ${filePath} -o ${outPath}`;
    exec(command1, (error, stdout, stderr) => {
        if (error) {
            console.log(error);
            reject(stderr);
            return;
        }
        if (stderr) {
            console.log(stderr)
            reject(stderr);
            return;
        }

        const command2 = `cd ${outputPath} && .\\${outputFileName} < ${inputFilePath}`;
        exec(command2, (error, stdout, stderr) => {
            if (error) {
                console.log(error)
                reject(stderr);
                return;
            }
            if (stderr) {
                console.log(stderr)
                reject(stderr);
                return;
            }
            resolve(stdout.replace(/\r\n/g, ''));
        });
    });
});




}


const executePy = (filePath, inputFilePath) => {
  const command = `python ${filePath} < ${inputFilePath}`;

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      }
      if (stderr) {
        reject(stderr);
      }
      // resolve(stdout)
      resolve(stdout.replace(/\r\n/g, ""));
    });
  });
};

const executeJava = (filePath, inputFilePath) => {
  const jobId = path.basename(filePath).split(".")[0];
  const outputFileName = `${jobId}`; // depends upon the environment
  const outPath = path.join(outputPath, outputFileName);
  // const command = `javac -d ${outputPath} ${filePath} && cd ${outputPath} && java ${outputFileName} < ${inputFilePath}`
  const command = `javac -d ${outputPath} ${filePath} && cd ${outputPath} && java Test < ${inputFilePath}`;

  console.log(command);
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(stderr);
      }
      // resolve(stdout)
      resolve(stdout.replace(/\r\n/g, ""));
    });
  });
};

module.exports = { executeCpp, executeJava, executePy };
