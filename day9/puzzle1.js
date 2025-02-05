const fs = require("node:fs");

function solvePuzzle(inputMap) {
  const intMap = inputMap.split("").map((x) => parseInt(x.trim()));
  const diskMap = [];
  let currentId = 0;
  intMap.forEach((value, idx) => {
    if (idx & 1) {
      // free space
      for (let i = 0; i < value; i++) diskMap.push(".");
    } else {
      // file allocated
      for (let i = 0; i < value; i++) diskMap.push(currentId.toString());
      currentId++;
    }
  });

  let left = 0;
  let right = diskMap.length - 1;
  while (left < right) {
    while (diskMap[left] != ".") left++;
    while (diskMap[right] == ".") right--;

    if (left >= right) break;

    diskMap[left] = diskMap[right];
    diskMap[right] = ".";
  }

  let ans = 0;
  for (let i = 0; i <= right; i++) ans += diskMap[i] * i;
  return ans;
}

const filename = process.argv[2];
const inputFile = fs.readFileSync(filename, "utf-8");

// process inputFile
const result = solvePuzzle(inputFile); // call solvePuzzle with suitable arguments
console.log(result);
