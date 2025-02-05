const fs = require("node:fs");

function solvePuzzle(inputMap) {
  const intMap = inputMap.split("").map((x) => parseInt(x.trim()));
  const diskMap = [];
  const freqMap = new Map();
  const fileMap = new Map();
  const notAllowed = new Set();

  let currentId = 0;
  intMap.forEach((value, idx) => {
    if (idx & 1) {
      // free space
      for (let i = 0; i < value; i++) diskMap.push(".");
    } else {
      // file allocated
      const fileStart = diskMap.length;
      for (let i = 0; i < value; i++) diskMap.push(currentId.toString());
      if (!freqMap.has(value)) freqMap.set(value, []);
      freqMap.get(value).push(currentId);
      fileMap.set(currentId, { start: fileStart, end: fileStart + value - 1 });
      currentId++;
    }
  });

  let left = 0;

  console.log(freqMap);

  console.log(diskMap.join(""));

  while (left < diskMap.length) {
    while (diskMap[left] != ".") {
      notAllowed.add(diskMap[left]);
      left++;
    }
    let freeBlockStart = left;
    while (diskMap[left] == ".") left++;
    const freeLength = left - freeBlockStart;
    if (freqMap.has(freeLength)) {
      let nextFile = freqMap.get(freeLength).pop();
      while (notAllowed.has(nextFile) && nextFile) {
        nextFile = freqMap.get(freeLength).pop();
      }
      if (!nextFile) break;
      while (freeBlockStart < left)
        diskMap[freeBlockStart++] = nextFile.toString();
      const fileInfo = fileMap.get(nextFile);
      for (let i = fileInfo.start; i <= fileInfo.end; i++) diskMap[i] = ".";
    }
  }
  console.log(diskMap.join(""));
}

const filename = process.argv[2];
const inputFile = fs.readFileSync(filename, "utf-8");

// process inputFile
const result = solvePuzzle(inputFile); // call solvePuzzle with suitable arguments
console.log(result);
