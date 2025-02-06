const fs = require("node:fs");

function findTrail(hikingMap, currentRow, currentCol, last, memo) {
  const [height, width] = [hikingMap.length, hikingMap[0].length];

  if (
    currentRow < 0 ||
    currentRow >= height ||
    currentCol < 0 ||
    currentCol >= width
  )
    return 0;
  const current = hikingMap[currentRow][currentCol];
  if (current != last + 1) return 0;
  if (current == 9) return 1;

  // console.log(current, currentRow, currentCol);

  const currentPositionVec = [currentRow, currentCol].toString();
  if (!memo.has(currentPositionVec)) {
    memo.set(
      currentPositionVec,
      findTrail(hikingMap, currentRow - 1, currentCol, current, memo) +
        findTrail(hikingMap, currentRow + 1, currentCol, current, memo) +
        findTrail(hikingMap, currentRow, currentCol - 1, current, memo) +
        findTrail(hikingMap, currentRow, currentCol + 1, current, memo)
    );
  }

  return memo.get(currentPositionVec);
}

function getScore(hikingMap, trailHead) {
  return findTrail(hikingMap, trailHead[0], trailHead[1], -1, new Map());
}

function solvePuzzle(hikingMap) {
  const trailHeads = [];
  hikingMap.forEach((row, rowIndex) => {
    let colIndex = -1;
    while ((colIndex = row.indexOf(0, colIndex + 1)) != -1)
      trailHeads.push([rowIndex, colIndex]);
  });

  const scores = trailHeads.map((head) => ({
    head: head,
    score: getScore(hikingMap, head),
  }));

  return scores.reduce((a, b) => a + b.score, 0);
}

const filename = process.argv[2];
const inputFile = fs.readFileSync(filename, "utf-8");
const hikingMap = inputFile
  .split("\n")
  .map((x) => x.split("").map((y) => parseInt(y.trim())));

// process inputFile
const result = solvePuzzle(hikingMap); // call solvePuzzle with suitable arguments
console.log(result);
