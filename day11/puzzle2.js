const fs = require("node:fs");

function blink(stone, curr, max, memo) {
  if (curr == max) return 1;

  const stoneVec = [stone, curr].toString();
  if (memo.has(stoneVec)) return memo.get(stoneVec);

  if (stone == 0) {
    memo.set(stoneVec, blink(1, curr + 1, max, memo));
  } else if ((stone.toString().length & 1) == 0) {
    const strStone = stone.toString();
    const mid = Math.floor(strStone.length / 2) - 1;
    memo.set(
      stoneVec,
      blink(parseInt(strStone.substring(0, mid + 1)), curr + 1, max, memo) +
        blink(parseInt(strStone.substring(mid + 1)), curr + 1, max, memo)
    );
  } else {
    memo.set(stoneVec, blink(stone * 2024, curr + 1, max, memo));
  }
  return memo.get(stoneVec);
}

function solvePuzzle(arrangement) {
  let ans = 0;
  const memo = new Map();
  arrangement.forEach((stone) => (ans += blink(stone, 0, 75, memo)));
  return ans;
}

const filename = process.argv[2];
const inputFile = fs.readFileSync(filename, "utf-8");
const arrangement = inputFile.split(" ").map((x) => parseInt(x.trim()));

// process inputFile
const result = solvePuzzle(arrangement); // call solvePuzzle with suitable arguments
console.log(result);
