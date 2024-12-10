export {};
const fs = require("fs");
const file = fs.readFileSync("2024/input/day1Input.txt") as Buffer;
let inputStr: string = "";
let input: Array<number[]> = new Array<number[]>();

let parseInput = () => {
  let row: number[];
  inputStr = file.toString();
  input[0] = new Array<number>();
  input[1] = new Array<number>();

  let rows = inputStr.split(/\r?\n/);
  rows.forEach((r) => {
    let row = r.split(/\s+/).map((s) => Number.parseInt(s));
    input[0].push(row[0]);
    input[1].push(row[1]);
  });

  input[0].sort();
  input[1].sort();
};

let day1Algorithm = () => {
  parseInput();
  let distance: number = 0;
  for (let i = 0; i < input[0].length; ++i) {
    distance += Math.abs(input[0][i] - input[1][i]);
  }

  return distance;
};

function day1Algorithm2(): void {
  parseInput();
  let simScore = 0;
  input[0].forEach((v) => {
    simScore += v * input[1].filter((v2) => v2 == v).length;
  });

  console.log(simScore);
}

day1Algorithm2();
