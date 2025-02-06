const fs = require("node:fs");

function getN(ax, ay, bx, by, px, py) {
  const dividend = ax * py - ay * px;
  const divisor = ax * by - ay * bx;

  if (divisor == 0) return -1;
  const result = dividend / divisor;
  if (Number.isInteger(result)) return Math.floor(result);
  else return -1;
}

function getM(ax, bx, px, n) {
  const dividend = px - bx * n;
  const result = dividend / ax;
  if (Number.isInteger(result)) return Math.floor(result);
  else return -1;
}

function solvePuzzle(prizes) {
  let tokensRequired = 0;
  prizes.forEach((config) => {
    const [ax, ay] = config.buttonA;
    const [bx, by] = config.buttonB;
    const [px, py] = config.prize;

    const n = getN(ax, ay, bx, by, px, py);
    const m = getM(ax, bx, px, n);
    if (n >= 0 && m >= 0 && n <= 100 && m <= 100) {
      tokensRequired += 3 * m + n;
    }
  });

  return tokensRequired;
}

const filename = process.argv[2];
const inputFile = fs.readFileSync(filename, "utf-8");

const buttonAPattern = /Button A: X([+-]\d+), Y([+-]\d+)/;
const buttonBPattern = /Button B: X([+-]\d+), Y([+-]\d+)/;
const prizePattern = /Prize: X=(\d+), Y=(\d+)/;
const inputSections = inputFile.split(/\n\s*\n/);

const prizes = inputSections.map((section) => {
  const buttonAGroups = buttonAPattern.exec(section);
  const buttonBGroups = buttonBPattern.exec(section);
  const prizeGroups = prizePattern.exec(section);
  return {
    buttonA: [
      parseInt(buttonAGroups[1].trim()),
      parseInt(buttonAGroups[2].trim()),
    ],
    buttonB: [
      parseInt(buttonBGroups[1].trim()),
      parseInt(buttonBGroups[2].trim()),
    ],
    prize: [parseInt(prizeGroups[1].trim()), parseInt(prizeGroups[2].trim())],
  };
});

// process inputFile
const result = solvePuzzle(prizes); // call solvePuzzle with suitable arguments
console.log(result);
