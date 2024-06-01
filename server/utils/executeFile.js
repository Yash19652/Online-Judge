const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const {exec} = require('child_process')

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}


const executeCpp = (filePath,inputFilePath) =>{
    const jobId = path.basename(filePath).split(".")[0];
    const outputFileName = `${jobId}.exe` // depends upon the environment
    const outPath = path.join(outputPath,outputFileName)

    return new Promise((resolve,reject) => {
        const command = `g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${outputFileName} < ${inputFilePath}`
        exec(command,
            (error,stdout,stderr) => {
                if(error){
                    reject(error)
                }
                if(stderr){
                    reject(stderr)
                }
                resolve(stdout)
            }
        )

    })

}


const executePy = (filePath) =>{
    console.log("cant exexute python file yet");
}

const executeJava = (filePath) =>{
    console.log("cant exexute java file yet");
}

module.exports = {executeCpp , executeJava , executePy}