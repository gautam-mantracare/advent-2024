const fs = require("node:fs");

function isOutsideGarden(height, width, i, j) {
  return i < 0 || i >= height || j < 0 || j >= width;
}

function isFenceRequired(garden, currentCrop, height, width, i, j) {
  return isOutsideGarden(height, width, i, j) || garden[i][j] != currentCrop;
}

function getPerimeter(garden, i, j, crop, traversed) {
  const [height, width] = [garden.length, garden[0].length];

  if (traversed.has([i, j].toString())) return 0;
  if (isOutsideGarden(height, width, i, j) || garden[i][j] == crop)
    traversed.add([i, j].toString());

  if (isFenceRequired(garden, crop, height, width, i, j)) return 1;
  return (
    getPerimeter(garden, i - 1, j, crop, traversed) +
    getPerimeter(garden, i + 1, j, crop, traversed) +
    getPerimeter(garden, i, j - 1, crop, traversed) +
    getPerimeter(garden, i, j + 1, crop, traversed)
  );
}

function traverseRegion(garden, i, j) {
  const crop = garden[i][j];
  const traversedNodes = new Set();
  // traverse up
  return {
    traversedNodes: traversedNodes,
    perimeter: getPerimeter(garden, i, j, crop, traversedNodes),
  };
}

function solvePuzzle(garden) {
  let visited = new Set();
  const regionMap = [];
  let ans = 0;
  const [height, width] = [garden.length, garden[0].length];

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (visited.has([i, j].toString())) continue;
      // find region
      const { traversedNodes, perimeter } = traverseRegion(garden, i, j);

      const area = Array.from(traversedNodes)
        .map((coord) => coord.split(",").map(Number))
        .map(([x, y]) => {
          return isOutsideGarden(height, width, x, y) ||
            garden[i][j] != garden[x][y]
            ? 0
            : 1;
        })
        .reduce((a, b) => a + b, 0);
      // console.log(area);
      ans += area * perimeter;
      visited = visited.union(traversedNodes);
      regionMap.push([
        {
          visited: Array.from(visited).join(" "),
          traversed: Array.from(traversedNodes).join(" "),
          area: area,
          perimeter,
          crop: garden[i][j],
        },
      ]);
    }
  }

  return ans;
}

const filename = process.argv[2];
const inputFile = fs.readFileSync(filename, "utf-8");
const garden = inputFile.split("\n");

// process inputFile
const result = solvePuzzle(garden); // call solvePuzzle with suitable arguments
console.log(result);
