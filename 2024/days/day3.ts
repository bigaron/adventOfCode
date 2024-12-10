export {};
const fs = require("fs");
const file = fs.readFileSync("2024/input/day3Input.txt") as Buffer;
let lines: Array<string> = new Array<string>();

function parseInput(): void {
  lines = file.toString().split(/\r?\n/);
}

function parseStrForResult(str: string): number {
  let values = str.split(",") as string[];
  values[0] = values[0].replace("mul(", "");
  values[1] = values[1].substring(0, values[1].indexOf(")"));

  return Number.parseInt(values[0]) * Number.parseInt(values[1]);
}

function day3Algorithm() {
  parseInput();
  let accum = 0;
  lines.forEach((l) => {
    let start = l.search(/mul\([0-9]+,[0-9]+\)/);
    let lenInBaseStr = 0;
    let end = l.indexOf(")", start) + 1;
    let subStr = l;
    while (start != -1) {
      accum += parseStrForResult(
        l.substring(lenInBaseStr + start, lenInBaseStr + end)
      );
      lenInBaseStr += end;
      subStr = l.substring(lenInBaseStr);
      start = subStr.search(/mul\([0-9]+,[0-9]+\)/);
      end = subStr.indexOf(")", start) + 1;
    }
  });

  console.log(accum);
}

function day3Algorithm2(): void {
  parseInput();
  let accum = 0;
  let isOn = true;
  let flagStep = false;
  lines.forEach((l) => {
    let start = -1;
    let lenInBaseStr = 0;
    let end = 0;
    let subStr = l;
    let changeOnState_Do = -1;
    let changeOnState_Dont = -1;

    while (true) {
      flagStep = false;
      lenInBaseStr += end;
      subStr = l.substring(lenInBaseStr);
      changeOnState_Do = subStr.indexOf("do()");
      changeOnState_Dont = subStr.indexOf("don't()");
      start = subStr.search(/mul\([0-9]+,[0-9]+\)/);
      end = subStr.indexOf(")", start) + 1;

      if (changeOnState_Do < start && changeOnState_Do != -1) {
        start = changeOnState_Do;
        end = start + 4;
        isOn = true;
        flagStep = true;
      }
      if (changeOnState_Dont < start && changeOnState_Dont != -1) {
        start = changeOnState_Dont;
        end = start + 7;
        isOn = false;
        flagStep = true;
      }

      if (start == -1) break;
      if (isOn && !flagStep) {
        accum += parseStrForResult(
          l.substring(lenInBaseStr + start, lenInBaseStr + end)
        );
      }
    }
  });

  console.log(accum);
}

day3Algorithm2();
