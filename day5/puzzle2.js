const fs = require("node:fs");

function isOrderRight(order, rules) {
  let notAllowed = new Set();
  const alreadyPrinted = new Set();

  alreadyPrinted.add(order[0]);
  if (rules.has(order[0])) notAllowed = notAllowed.union(rules.get(order[0]));

  for (let i = 1; i < order.length; i++) {
    const currentPage = order[i];
    const previousPages = rules.get(currentPage);
    if (
      (previousPages && alreadyPrinted.intersection(previousPages).size == 0) ||
      notAllowed.has(currentPage)
    )
      return false;

    alreadyPrinted.add(currentPage);
    if (previousPages) notAllowed = notAllowed.union(previousPages);
  }
  return true;
}

function rectifyOrder(order, rules) {
  order.sort((page1, page2) => {
    const previousPages1 = rules.get(page1) ?? new Set();
    const previousPages2 = rules.get(page2) ?? new Set();

    if (previousPages1.size && previousPages1.has(page2)) return 1;
    else if (previousPages2.size && previousPages2.has(page1)) return -1;
    else return 0;
  });
}

function solvePuzzle(rules, printingOrders) {
  let rightOrdersMiddleSum = 0;

  for (let i = 0; i < printingOrders.length; i++) {
    const order = printingOrders[i];
    if (!isOrderRight(order, rules)) {
      rectifyOrder(order, rules);
      const mid = Math.floor(order.length / 2);
      rightOrdersMiddleSum += order[mid];
    }
  }

  return rightOrdersMiddleSum;
}

const filename = process.argv[2];
const inputFile = fs.readFileSync(filename, "utf-8");

const inputSections = inputFile.split(/\n\s*\n/);
const rules = new Map();

const rawRules = inputSections[0].split("\n");
for (let i = 0; i < rawRules.length; i++) {
  const [prev, next] = rawRules[i]
    .split("|")
    .map((page) => parseInt(page.trim()));
  if (!rules.has(next)) {
    rules.set(next, new Set());
  }
  rules.get(next).add(prev);
}

const printingOrders = inputSections[1]
  .split("\n")
  .map((order) => order.split(",").map((page) => parseInt(page.trim())));

const result = solvePuzzle(rules, printingOrders);
console.log(result);
