const fs = require("node:fs");

function countDiagonals(wordSearch, row, col) {
  const patterns = ["MAS", "SAM"];
  if (
    col + 1 < wordSearch[row].length &&
    col - 1 >= 0 &&
    row + 1 < wordSearch.length &&
    row - 1 >= 0
  ) {
    const rightDiagonal =
      wordSearch[row - 1][col - 1] +
      wordSearch[row][col] +
      wordSearch[row + 1][col + 1];
    const leftDiagonal =
      wordSearch[row - 1][col + 1] +
      wordSearch[row][col] +
      wordSearch[row + 1][col - 1];
    if (patterns.includes(rightDiagonal) && patterns.includes(leftDiagonal))
      return 1;
  }
  return 0;
}

function solvePuzzle(wordSearch) {
  let count = 0;

  for (let i = 0; i < wordSearch.length; i++) {
    for (let j = 0; j < wordSearch[i].length; j++) {
      if (wordSearch[i][j] == "A") count += countDiagonals(wordSearch, i, j);
    }
  }
  return count;
}

const filename = process.argv[2];
const inputFile = fs.readFileSync(filename, "utf-8");

const wordSearch = inputFile.split("\n");
const result = solvePuzzle(wordSearch);
console.log(result);
