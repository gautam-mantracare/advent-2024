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
  }
}

function solvePuzzle(mappedArea, startRow, startCol) {
  let distinctPoints = 1;
  let currentDirection = "up";
  let currentRow = startRow;
  let currentCol = startCol;
  mappedArea[startRow][startCol] = "X";

  while (true) {
    const [nextRow, nextCol] = getNextLocation(
      currentRow,
      currentCol,
      currentDirection
    );

    // check if next move sends the guard out of the area
    if (
      nextRow < 0 ||
      nextRow >= mappedArea.length ||
      nextCol < 0 ||
      nextCol >= mappedArea.length
    )
      break;

    // check if next location is an obstacle... update direction accordingly
    if (mappedArea[nextRow][nextCol] == "#") {
      currentDirection = getNextDirection(currentDirection);
    } else {
      if (mappedArea[nextRow][nextCol] == ".") distinctPoints++;
      mappedArea[nextRow][nextCol] = "X";
      currentRow = nextRow;
      currentCol = nextCol;
    }
  }

  return distinctPoints;
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
// console.log(mappedArea.map((x) => x.join("")).join("\n"));
