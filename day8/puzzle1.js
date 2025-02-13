const fs = require("node:fs");

function isInBounds(rows, cols, row, col) {
  return row >= 0 && col >= 0 && row < rows && col < cols;
}

function getLocationDiff(location1, location2, opposite = false) {
  if (opposite)
    return [location1[0] + location2[0], location1[1] + location2[1]];
  else return [location1[0] - location2[0], location1[1] - location2[1]];
}

function findPossibleAntinode(location1, location2, diff) {
  // one of the antinodes is actually antenna location...
  const possibleAntinode1 = getLocationDiff(location1, diff, true);
  const possibleAntinode2 = getLocationDiff(location1, diff);

  return possibleAntinode1[0] != location2[0]
    ? possibleAntinode1
    : possibleAntinode2;
}

function getAntinodes(frequencyLocations, verify) {
  for (let i = 0; i < frequencyLocations.length; i++) {
    const location1 = frequencyLocations[i];
    for (let j = i + 1; j < frequencyLocations.length; j++) {
      const location2 = frequencyLocations[j];
      const diff = getLocationDiff(location1, location2);
      const antinode1 = findPossibleAntinode(location1, location2, diff);
      const antinode2 = findPossibleAntinode(location2, location1, diff);
      verify(antinode1, antinode2);
    }
  }
}

function solvePuzzle(mappedArea) {
  const frequencyLocations = new Map();
  const visitedAntinodes = new Set();
  let ans = 0;

  for (let i = 0; i < mappedArea.length; i++) {
    for (let j = 0; j < mappedArea[i].length; j++) {
      const frequency = mappedArea[i][j];
      if (frequency != ".") {
        if (!frequencyLocations.has(frequency))
          frequencyLocations.set(frequency, []);
        frequencyLocations.get(frequency).push([i, j]);
      }
    }
  }

  for (const locations of frequencyLocations.values()) {
    getAntinodes(locations, (...antinodes) => {
      antinodes.forEach((antinode) => {
        if (
          isInBounds(
            mappedArea.length,
            mappedArea[0].length,
            antinode[0],
            antinode[1]
          )
        ) {
          const actualVal = mappedArea[antinode[0]][antinode[1]];
          visitedAntinodes.add(antinode.toString());
          if (actualVal == ".") {
            mappedArea[antinode[0]][antinode[1]] = "#";
          }
        }
      });
    });
  }

  // console.log(
  //   mappedArea.map((x, i) => i.toString() + "\t" + x.join("")).join("\n")
  // );
  // console.log(visitedAntinodes);

  return visitedAntinodes.size;
}

const filename = process.argv[2];
const inputFile = fs.readFileSync(filename, "utf-8");

const mappedArea = inputFile.split("\n").map((x) => x.split(""));
// process inputFile
const result = solvePuzzle(mappedArea); // call solvePuzzle with suitable arguments
console.log(result);
