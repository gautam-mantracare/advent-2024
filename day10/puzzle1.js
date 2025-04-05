const fs = require("node:fs");

function getTrailHeadScore(hikingMap, trailHeadPosition) {
  
}

function solvePuzzle(hikingMap) {
  const trailHeads = [];
  hikingMap.forEach((row, rowIdx) => {
    let colIdx = -1;
    while ((colIdx = row.indexOf(0, colIdx + 1)) != -1)
      trailHeads.push([rowIdx, colIdx]);
  });
}

const filename = process.argv[2];
const inputFile = fs.readFileSync(filename, "utf-8");
const hikingMap = inputFile
  .split("\n")
  .map((x) => x.split("").map((x) => parseInt(x.trim())));

// process inputFile
const result = solvePuzzle(hikingMap); // call solvePuzzle with suitable arguments
console.log(result);
