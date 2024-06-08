const fs = require('fs');
const path = require('path');


const compareFiles =(file1, file2)=> {
 
  const data1 = fs.readFileSync(file1, 'utf8').replace(/\r/g,'');
  const data2 = fs.readFileSync(file2, 'utf8').replace(/\r/g,'');

  console.log(data1,data2);
  
  var lines1 = data1.split('\n');
  lines1 = lines1.filter(part => part !== '');

  var lines2 = data2.split('\n');
  lines2 = lines2.filter(part => part !== '');

  // if(language==="py")
  //   {
  //     const lines = input.split('\n');
  //     let processedInput = lines.map(line => line.split(' ').join('\n')).join('\n');
  //     fs.writeFileSync(inputfilePath, processedInput);
  //     return inputfilePath;
  //   }

  const maxLength = Math.max(lines1.length, lines2.length);
  for (var i = 0; i < maxLength; i++) {
    if (lines1[i] != lines2[i]) {
      return {verdict :false , lineNo : i+1};
    }
  }

  // If no difference is found
  return {verdict :true , lineNo:i}
}

module.exports = { compareFiles };
