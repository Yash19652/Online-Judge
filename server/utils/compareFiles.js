const fs = require('fs');
const path = require('path');

// Function to compare two files line by line
const compareFiles =(file1, file2)=> {
  // Read the contents of both files
  const data1 = fs.readFileSync(file1, 'utf8').replace(/\r/g,'');
  const data2 = fs.readFileSync(file2, 'utf8');
  
  var lines1 = data1.split('\n');
  lines1 = lines1.filter(part => part !== '');

  var lines2 = data2.split('\n');

  const maxLength = Math.max(lines1.length, lines2.length);
  for (var i = 0; i < maxLength; i++) {
    if (lines1[i] != lines2[i]) {
      console.log(`Files differ at line ${i + 1}`);
      console.log(`File 1: ${lines1[i]}`);
      console.log(`File 2: ${lines2[i]}`);
      return {verdict :false , lineNo : i+1};
    }
  }

  // If no difference is found
  return {verdict :true , lineNo:i}
}

module.exports = { compareFiles };
