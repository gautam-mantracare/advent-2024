const fs = require("node:fs");

function isInBounds(height, width, row, col) {
  return row >= 0 && col >= 0 && row < height && col < width;
}

function getLocationDiff(location1, location2, opposite = false) {
  if (opposite)
    return [location1[0] + location2[0], location1[1] + location2[1]];
  else return [location1[0] - location2[0], location1[1] - location2[1]];
}

function findPossibleAntinode(location, diff, verify, height, width) {
  // one of the antinodes is actually antenna location...
  let possibleAntinode1 = location;
  do {
    possibleAntinode1 = getLocationDiff(possibleAntinode1, diff, true);
    verify(possibleAntinode1);
  } while (
    isInBounds(height, width, possibleAntinode1[0], possibleAntinode1[1])
  );
  let possibleAntinode2 = location;
  do {
    possibleAntinode2 = getLocationDiff(possibleAntinode2, diff);
    verify(possibleAntinode2);
  } while (
    isInBounds(height, width, possibleAntinode2[0], possibleAntinode2[1])
  );
}

function getAntinodes(height, width, frequencyLocations, verify) {
  for (let i = 0; i < frequencyLocations.length; i++) {
    const location1 = frequencyLocations[i];
    for (let j = i + 1; j < frequencyLocations.length; j++) {
      const location2 = frequencyLocations[j];
      const diff = getLocationDiff(location1, location2);
      findPossibleAntinode(location1, diff, verify, height, width);
      findPossibleAntinode(location2, diff, verify, height, width);
    }
  }
}

function solvePuzzle(mappedArea) {
  const frequencyLocations = new Map();
  const visitedAntinodes = new Set();
  const [height, width] = [mappedArea.length, mappedArea[0].length];

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
    getAntinodes(height, width, locations, (...antinodes) => {
      antinodes.forEach((antinode) => {
        if (isInBounds(height, width, antinode[0], antinode[1])) {
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
