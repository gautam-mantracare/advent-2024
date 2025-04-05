const fs = require("node:fs");

// class LinkNode {
//   value = null;
//   next = null;

//   constructor(value) {
//     this.value = value;
//   }
// }

function blink(arrangement) {
  const newArrangement = [];
  arrangement.forEach((stone) => {
    if (stone == 0) {
      newArrangement.push(1);
    } else if ((stone.toString().length & 1) == 0) {
      const strStone = stone.toString();
      const mid = Math.floor(strStone.length / 2) - 1;
      newArrangement.push(parseInt(strStone.substring(0, mid + 1)));
      newArrangement.push(parseInt(strStone.substring(mid + 1)));
    } else {
      newArrangement.push(stone * 2024);
    }
  });

  return newArrangement;
}

function solvePuzzle(arrangement) {
  let newArrangement = arrangement;
  for (let i = 0; i < 25; i++) newArrangement = blink(newArrangement);
  return newArrangement.length;
}

const filename = process.argv[2];
const inputFile = fs.readFileSync(filename, "utf-8");
const arrangement = inputFile.split(" ").map((x) => parseInt(x.trim()));

// process inputFile
const result = solvePuzzle(arrangement); // call solvePuzzle with suitable arguments
console.log(result);
