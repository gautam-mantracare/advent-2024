const fs = require("node:fs");

function getNextLocation(currentRow, currentCol, direction) {
  switch (direction) {
    case "up":
      return [currentRow - 1, currentCol];
    case "down":
      return [currentRow + 1, currentCol];
    case "left":
      return [currentRow, currentCol - 1];
    case "right":
      return [currentRow, currentCol + 1];
    default:
      return [currentRow - 1, currentCol];
  }
}

function getNextDirection(currentDirection) {
  switch (currentDirection) {
    case "up":
      return "right";
    case "right":
      return "down";
    case "down":
      return "left";
    case "left":
      return "up";
    default:
      return "up";
  }
}

function isOutsideArea(row, col, n) {
  return row < 0 || row >= n || col < 0 || col >= n;
}

function peekRight(mappedArea, currentRow, currentCol, currentDirection) {
  const nextDirection = getNextDirection(currentDirection);
  const [rightRow, rightCol] = getNextLocation(
    currentRow,
    currentCol,
    nextDirection
  );

  if (!isOutsideArea(currentRow, currentCol, mappedArea.length))
    return mappedArea[rightRow][rightCol] == "X";
}

function hasLoop(mappedArea, startRow, startCol) {
  // console.log("\t0 1 2 3 4 5 6 7 8 9");
  // console.log(
  //   mappedArea.map((x, i) => i.toString() + "\t" + x.join(" ")).join("\n")
  // );
  const vectorMap = new Map();
  let currentRow = startRow;
  let currentCol = startCol;
  let currentDirection = "up";

  while (true) {
    const [nextRow, nextCol] = getNextLocation(
      currentRow,
      currentCol,
      currentDirection
    );

    // console.clear();
    // printMap(mappedArea);

    // check if next move sends the guard out of the area
    if (isOutsideArea(nextRow, nextCol, mappedArea.length)) return false;

    // check if its a loop
    if (vectorMap.get(`${currentRow},${currentCol}`) == currentDirection)
      return true;

    // check if next location is an obstacle... update direction accordingly
    if (mappedArea[nextRow][nextCol] == "#") {
      currentDirection = getNextDirection(currentDirection);
    } else {
      updateAreaStep(mappedArea, currentRow, currentCol, currentDirection);
      vectorMap.set(`${currentRow},${currentCol}`, currentDirection);
      currentRow = nextRow;
      currentCol = nextCol;
    }
  }
}

function printMap(mappedArea) {
  console.log("\t0 1 2 3 4 5 6 7 8 9");
  console.log(
    mappedArea.map((x, i) => i.toString() + "\t" + x.join(" ")).join("\n")
  );
}

function updateAreaStep(mappedArea, row, col, direction) {
  const orig = mappedArea[row][col];
  if (orig == "." || orig == "^") {
    mappedArea[row][col] = direction == "up" || direction == "down" ? "|" : "-";
  } else {
    if (orig == "-" && direction != "left" && direction != "right")
      mappedArea[row][col] = "+";
    else if (orig == "|" && direction != "up" && direction != "down")
      mappedArea[row][col] = "+";
  }
}

function solvePuzzle(mappedArea, startRow, startCol) {
  let currentDirection = "up";
  let currentRow = startRow;
  let currentCol = startCol;
  const possibleObstacles = new Set();

  while (true) {
    const [nextRow, nextCol] = getNextLocation(
      currentRow,
      currentCol,
      currentDirection
    );

    // console.clear();
    // check if next move sends the guard out of the area
    if (isOutsideArea(nextRow, nextCol, mappedArea.length)) break;

    // check if next location is an obstacle... update direction accordingly
    if (mappedArea[nextRow][nextCol] == "#") {
      currentDirection = getNextDirection(currentDirection);
    } else {
      // updateAreaStep(mappedArea, currentRow, currentCol);
      currentRow = nextRow;
      currentCol = nextCol;
      possibleObstacles.add(`${currentRow},${currentCol}`);
    }
  }

  let ans = 0;
  for (const position of possibleObstacles.values()) {
    const [row, col] = position.split(",").map((x) => parseInt(x.trim()));
    const orig = mappedArea[row][col];
    mappedArea[row][col] = "#";
    try {
      if (hasLoop(mappedArea, startRow, startCol)) {
        ans++;
        // printMap(mappedArea);
        // console.log(row, col, "\n");
      }
    } catch (error) {
      console.log(error);
      console.log(row, col);
      printMap(mappedArea);
      break;
    }
    mappedArea[row][col] = orig;
    // break;
  }

  return ans;
}

const filename = process.argv[2];
const inputFile = fs.readFileSync(filename, "utf-8");

const startPosition = inputFile.indexOf("^");
const mappedArea = inputFile.split("\n").map((x) => x.split(""));
// console.log(mappedArea.map((x) => x.join("")).join("\n"));
const startRow = Math.floor(startPosition / mappedArea.length) - 1;
const startCol = mappedArea[startRow].indexOf("^");
const result = solvePuzzle(mappedArea, startRow, startCol);
console.log(result);
// console.log("\t0 1 2 3 4 5 6 7 8 9");
// console.log(
//   mappedArea.map((x, i) => i.toString() + "\t" + x.join(" ")).join("\n")
// );
