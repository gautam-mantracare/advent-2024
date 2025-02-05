const fs = require("node:fs");

function solvePuzzle(inputMap) {
  const intMap = inputMap.split("").map((x) => parseInt(x.trim()));
  const diskMap = [];
  const fileMap = new Map();
  const fileIds = [];

  let currentId = 0;
  intMap.forEach((value, idx) => {
    if (idx & 1) {
      // free space
      for (let i = 0; i < value; i++) diskMap.push(".");
    } else {
      // file allocated
      const fileStart = diskMap.length;
      for (let i = 0; i < value; i++) diskMap.push(currentId.toString());
      fileIds.push(currentId);
      fileMap.set(currentId, {
        start: fileStart,
        end: fileStart + value - 1,
        count: value,
      });
      currentId++;
    }
  });

  for (let i = fileIds.length - 1; i >= 0; i--) {
    const fileId = fileIds[i];
    const fileInfo = fileMap.get(fileId);
    let left = 0;
    while (diskMap[left] != "." && left < diskMap.length) left++;
    let start = left;
    let count = 0;
    while (left < diskMap.length && count < fileInfo.count) {
      if (diskMap[left] != ".") count = 0;
      else count++;
      if (count == 0) start = left + 1;
      left++;
    }

    if (count != fileInfo.count || start > fileInfo.start) continue;
    for (let j = start; j < left; j++) diskMap[j] = fileId;

    for (let j = fileInfo.start; j <= fileInfo.end; j++) diskMap[j] = ".";
  }

  let ans = 0;
  for (let i = 0; i < diskMap.length; i++)
    if (diskMap[i] != ".") ans += diskMap[i] * i;
  return ans;
}

const filename = process.argv[2];
const inputFile = fs.readFileSync(filename, "utf-8");

// process inputFile
const result = solvePuzzle(inputFile); // call solvePuzzle with suitable arguments
console.log(result);
