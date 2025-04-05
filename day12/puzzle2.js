const fs = require("node:fs");

function isOutsideGarden(height, width, i, j) {
  return i < 0 || i >= height || j < 0 || j >= width;
}

function isFenceRequired(garden, currentCrop, height, width, i, j) {
  return isOutsideGarden(height, width, i, j) || garden[i][j] !== currentCrop;
}

function checkIsBlocked(garden, i, j, ...neighbors) {
  const [height, width] = [garden.length, garden[0].length];

  const [diagonalBlocked, verticalBlocked, horizontalBlocked] = neighbors.map(
    ([x, y]) =>
      isOutsideGarden(height, width, x, y) || garden[x][y] !== garden[i][j]
  );

  if (diagonalBlocked && verticalBlocked && horizontalBlocked) return 1;
  else if (horizontalBlocked && !verticalBlocked && !diagonalBlocked) return 1;
  else if (!diagonalBlocked && verticalBlocked && horizontalBlocked) return 1;
  else return 0;
}

function countCorners(garden, i, j) {
  const n = [i - 1, j];
  const s = [i + 1, j];
  const e = [i, j + 1];
  const w = [i, j - 1];
  const nw = [i - 1, j - 1];
  const ne = [i - 1, j + 1];
  const sw = [i + 1, j - 1];
  const se = [i + 1, j + 1];

  return (
    checkIsBlocked(garden, i, j, nw, n, w) +
    checkIsBlocked(garden, i, j, ne, n, e) +
    checkIsBlocked(garden, i, j, se, s, e) +
    checkIsBlocked(garden, i, j, sw, s, w)
  );
}

function traverse(garden, i, j, crop, traversed) {
  const [height, width] = [garden.length, garden[0].length];
  const coords = [i, j].toString();
  if (traversed.has(coords)) return;
  if (isFenceRequired(garden, crop, height, width, i, j)) return 1;

  traversed.add(coords);

  traverse(garden, i - 1, j, crop, traversed);
  traverse(garden, i + 1, j, crop, traversed);
  traverse(garden, i, j - 1, crop, traversed);
  traverse(garden, i, j + 1, crop, traversed);
}

function traverseRegion(garden, i, j) {
  const crop = garden[i][j];
  const traversedNodes = new Set();
  traverse(garden, i, j, crop, traversedNodes);
  return traversedNodes;
}

function solvePuzzle(garden) {
  let visited = new Set();
  const regionMap = [];
  let ans = 0;
  const [height, width] = [garden.length, garden[0].length];

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (visited.has([i, j].toString())) continue;

      // Find region
      const traversedNodes = traverseRegion(garden, i, j);
      const area = Array.from(traversedNodes)
        .map((coord) => coord.split(",").map(Number))
        .map(([x, y]) => {
          return isOutsideGarden(height, width, x, y) ||
            garden[i][j] !== garden[x][y]
            ? 0
            : 1;
        })
        .reduce((a, b) => a + b, 0);

      // Add to visited set
      traversedNodes.forEach((coord) => visited.add(coord));

      regionMap.push({
        region: Array.from(traversedNodes),
        area: area,
        crop: garden[i][j],
      });
    }
  }

  regionMap.forEach(({ region, area }, idx) => {
    const sides = region
      .map((coord) => coord.split(",").map(Number))
      .map(([x, y]) => countCorners(garden, x, y));
    regionMap[idx]["sides"] = sides;
    ans += area * sides.reduce((a, b) => a + b, 0);
  });

  return ans;
}

const filename = process.argv[2];
const inputFile = fs.readFileSync(filename, "utf-8");
const garden = inputFile.split("\n").map((row) => row.trim().split(""));

const result = solvePuzzle(garden);
console.log(result);
