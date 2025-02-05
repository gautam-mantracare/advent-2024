const fs = require("node:fs");

function add(x, y) {
  return x + y;
}

function multiply(x, y) {
  return x * y;
}

function concat(x, y) {
  return parseInt(`${x}${y}`);
}

function generateOperators(curr, n, operators, result) {
  if (curr.length == n) {
    result.push(curr);
    return;
  }
  for (let i = 0; i < operators.length; i++)
    generateOperators(
      curr + operators[(curr.length + i) % operators.length],
      n,
      operators,
      result
    );
}

function calculate(curr, operands, i, operation, operators) {
  if (i >= operands.length) return curr;

  // TODO: use memoization
  // if (memo.has(operation.substring(i)))
  //   return op(curr, memo.get(operation.substring(i + 1)));
  const op = operators[operation[i - 1]];
  return calculate(
    op(curr, operands[i]),
    operands,
    i + 1,
    operation,
    operators
  );
}

function solvePuzzle(equations) {
  const operators = {
    "+": add,
    "*": multiply,
    "|": concat,
  };

  let ans = 0;
  for (let i = 0; i < equations.length; i++) {
    const [expectedResult, currentEquation] = equations[i];
    const possibleOperators = [];

    generateOperators(
      "",
      currentEquation.length - 1,
      Object.keys(operators),
      possibleOperators
    );

    // console.log(possibleOperators);
    for (let j = 0; j < possibleOperators.length; j++) {
      const value = calculate(
        currentEquation[0],
        currentEquation,
        1,
        possibleOperators[j],
        operators
      );
      // console.log(currentEquation, possibleOperators[j], value, expectedResult);
      if (value == expectedResult) {
        ans += value;
        break;
      }
    }
  }

  return ans;
}

const filename = process.argv[2];
const inputFile = fs.readFileSync(filename, "utf-8");

const rawResults = inputFile.split("\n");
const equations = [];
rawResults.forEach((rawResult) => {
  const [result, rawOperands] = rawResult.split(":");
  equations.push([
    parseInt(result.trim()),
    rawOperands
      .trim()
      .split(" ")
      .map((x) => parseInt(x.trim())),
  ]);
});

// process inputFile
const result = solvePuzzle(equations); // call solvePuzzle with suitable arguments
console.log(result);
