export {};
const fs = require("fs");
const file = fs.readFileSync("2024/input/day2Test.txt") as Buffer;
let fileRows: Array<Array<number>> = new Array<Array<number>>();
let safeReports: Array<boolean> = new Array<boolean>();

function parseInput(): void {
  file
    .toString()
    .split(/\r?\n/)
    .forEach((r) => {
      fileRows.push(r.split(/\s+/).map((v) => Number.parseInt(v)));
    });
}

function day2Algorithm(): void {
  parseInput();
  const maxDist: number = 3;
  const minDist: number = 1;
  let accum = 0;
  fileRows.forEach((r) => {
    const desc: boolean = r[0] - r[1] < 0;
    let safe: boolean = true;
    for (let i: number = 0; i < r.length - 1; ++i) {
      let diff = r[i] - r[i + 1];
      if ((diff < 0 && !desc) || (diff > 0 && desc)) safe = false;
      diff = Math.abs(diff);
      if (diff < 1 || diff > 3) safe = false;
    }
    if (safe) accum++;
  });

  console.log(accum);
}

function getLocalMonotonity(list: Array<number>): Array<number> {
  let result = [0, 0];

  for (let i = 0; i < list.length - 1; ++i) {
    if (list[i] - list[i + 1] > 0) result[1]++;
    else if (list[i] - list[i + 1] < 0) result[0]++;
  }

  return result;
}

function day2Algorithm2(): void {
  parseInput();
  const maxDist: number = 3;
  const minDist: number = 1;
  let accum = 0;
  let asc = false;

  fileRows.forEach((r) => {
    let result = getLocalMonotonity(r);
    let ascCount = result[0];
    let descCount = result[1];

    let diff = Math.abs(ascCount - descCount);
    if (diff < Math.max(ascCount, descCount) - 1) return;
    asc = ascCount > descCount;

    

    accum++;
  });
}

// --- low ---
// 249

day2Algorithm2();
