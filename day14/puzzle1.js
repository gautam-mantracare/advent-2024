const fs = require("node:fs");

function move(robot, height, width, curr, memo) {
  if (curr == 100) return;

  const roboVec = [...robot.position, ...robot.velocity, curr];
  if (memo.has(roboVec.toString())) return memo.get(roboVec);

  const [x, y] = robot.position;
  const [vx, vy] = robot.velocity;

  robot.position = [(x + vx) % width, (y + vy) % height];
  memo.set(roboVec, [...robot.position]);
  move(robot, height, width, curr + 1, memo);
}

function solvePuzzle(robots, height, width) {
  const memo = new Map();
}

const filename = process.argv[2];
const inputFile = fs.readFileSync(filename, "utf-8");

const height = 7;
const width = 11;
const robots = inputFile.split("\n").map((robot) => {
  const positionAndVelocity = robot.split(" ");
  const position = positionAndVelocity[0]
    .split("=")[1]
    .split(",")
    .map((x) => parseInt(x.trim()));

  const velocity = positionAndVelocity[1]
    .split("=")[1]
    .split(",")
    .map((x) => parseInt(x.trim()));

  return { position, velocity };
});

// process inputFile
const result = solvePuzzle(robots, height, width); // call solvePuzzle with suitable arguments
console.log(result);
