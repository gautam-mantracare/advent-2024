const fs = require("node:fs");

function countHorizontal(wordSearch, row, col) {
  const patterns = ["XMAS", "SAMX"];
  if (patterns.includes(wordSearch[row].substr(col, 4))) return 1;
  return 0;
}

function countVertical(wordSearch, row, col) {
  const patterns = ["XMAS", "SAMX"];
  if (row + 3 < wordSearch.length) {
    const word =
      wordSearch[row][col] +
      wordSearch[row + 1][col] +
      wordSearch[row + 2][col] +
      wordSearch[row + 3][col];
    if (patterns.includes(word)) return 1;
  }
  return 0;
}

function countDiagonals(wordSearch, row, col) {
  const patterns = ["XMAS", "SAMX"];
  let cnt = 0;
  if (col + 3 < wordSearch[row].length && row + 3 < wordSearch.length) {
    const word =
      wordSearch[row][col] +
      wordSearch[row + 1][col + 1] +
      wordSearch[row + 2][col + 2] +
      wordSearch[row + 3][col + 3];
    if (patterns.includes(word)) cnt++;
  }

  if (col - 3 >= 0 && row + 3 < wordSearch.length) {
    const word =
      wordSearch[row][col] +
      wordSearch[row + 1][col - 1] +
      wordSearch[row + 2][col - 2] +
      wordSearch[row + 3][col - 3];
    if (patterns.includes(word)) cnt++;
  }
  return cnt;
}

function solvePuzzle(wordSearch) {
  let count = 0;

  for (let i = 0; i < wordSearch.length; i++) {
    for (let j = 0; j < wordSearch[i].length; j++) {
      count += countHorizontal(wordSearch, i, j);
      count += countVertical(wordSearch, i, j);
      count += countDiagonals(wordSearch, i, j);
    }
  }
  return count;
}

const filename = process.argv[2];
const inputFile = fs.readFileSync(filename, "utf-8");

const wordSearch = inputFile.split("\n");
const result = solvePuzzle(wordSearch);
console.log(result);
