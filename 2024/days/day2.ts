export {};
const fs = require("fs");
const file = fs.readFileSync("2024/input/day2Input.txt") as Buffer;

function parseInput(): Array<number[]> {
  let result = new Array<number[]>();

  result = file
    .toString()
    .split(/\r?\n/)
    .map((r) => {
      return r.split(/\s+/).map((s) => Number.parseInt(s));
    });

  return result;
}

function day2Algorithm(): void {
  const reports = parseInput();
  const maxDiff = 3;
  const minDiff = 1;
  let goodReportsCount = 0;

  reports.forEach((r) => {
    let prevDesc = r[1] - r[0] < 0;
    let desc = r[1] - r[0] < 0;
    for (let levelIdx = 1; levelIdx < r.length; ++levelIdx) {
      let levelDiff = Math.abs(r[levelIdx] - r[levelIdx - 1]);
      desc = r[levelIdx] - r[levelIdx - 1] < 0;
      if (desc != prevDesc) return;
      //If the report is bad we skip to the next one in the array
      if (levelDiff > maxDiff || levelDiff < minDiff) return;
      prevDesc = desc;
    }

    goodReportsCount++;
  });

  console.log(goodReportsCount);
}

function day2Algorithm2(): void {
  const reports = parseInput();
  const maxDiff = 3;
  const minDiff = 1;
  let goodReportsCount = 0;

  for (let reportIdx = 0; reportIdx < reports.length; ++reportIdx) {
    let r = reports[reportIdx];
    let usedProblemDampener = false;
    let prevDesc = r[1] - r[0] < 0;
    let desc = r[1] - r[0] < 0;

    for (let levelIdx = 1; levelIdx < r.length; ++levelIdx) {
      let levelDiff = Math.abs(r[levelIdx] - r[levelIdx - 1]);
      desc = r[levelIdx] - r[levelIdx - 1] < 0;
      if (desc != prevDesc && usedProblemDampener) break;

      if (levelDiff > maxDiff || (levelDiff < minDiff && usedProblemDampener))
        break;
      prevDesc = desc;
    }

    goodReportsCount++;
  }

  console.log(goodReportsCount);
}

day2Algorithm();
