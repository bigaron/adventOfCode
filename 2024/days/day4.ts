export {};
const fs = require("fs");
const file = fs.readFileSync("2024/input/day4Input.txt") as Buffer;

function parseInput(): Array<string> {
  return file.toString().split(/\r?\n/);
}

function upLeftCheck(
  lines: Array<string>,
  startLine: number,
  startChar: number,
  wordToCheck: string
): boolean {
  //If we are closer to the top or the left than the xmas number is possible we return
  if (
    lines.length < wordToCheck.length ||
    startLine < wordToCheck.length - 1 ||
    startChar < wordToCheck.length - 1
  ) {
    return false;
  }

  let possibleWord = "";
  for (let i = 0; i < wordToCheck.length; ++i) {
    possibleWord += lines[startLine - i].charAt(startChar - i);
  }

  return (
    possibleWord == wordToCheck ||
    possibleWord == wordToCheck.split("").reverse().join("")
  );
}

function upRightCheck(
  lines: Array<string>,
  startLine: number,
  startChar: number,
  wordToCheck: string
): boolean {
  //If we are closer to the top or the left than the xmas number is possible we return
  if (lines.length < wordToCheck.length || startLine < wordToCheck.length - 1)
    return false;
  let possibleWord = "" as string;
  for (let i = 0; i < wordToCheck.length; ++i) {
    // If it overflows we return
    if (startChar + i >= lines[startLine - i].length) return false;
    let line = lines[startLine - i] as string;
    let char = line[startChar + i] as string;
    possibleWord += char;
  }

  return (
    possibleWord == wordToCheck ||
    possibleWord == wordToCheck.split("").reverse().join("")
  );
}

function upCheck(
  lines: Array<string>,
  startLine: number,
  startChar: number
): boolean {
  if (lines.length < 4 || startLine < 3) return false;
  let possibleWord = "" as string;
  for (let i = 0; i < 4; ++i) {
    let val = lines[startLine - i][startChar];
    possibleWord += val;
  }

  return possibleWord == "XMAS" || possibleWord == "SAMX";
}

function day4Algorithm(): void {
  const lines = parseInput() as Array<string>;

  let xmasCount = 0;

  for (let lineIdx = 0; lineIdx < lines.length; ++lineIdx) {
    let line = lines[lineIdx] as string;
    //Horizontal xmas
    xmasCount += line.split(/XMAS/).length - 1;
    xmasCount += line.split(/SAMX/).length - 1;

    for (let charIdx = 0; charIdx < line.length; ++charIdx) {
      if (line[charIdx] == "X" || line[charIdx] == "S") {
        xmasCount += upLeftCheck(lines, lineIdx, charIdx, "XMAS") ? 1 : 0;
        xmasCount += upRightCheck(lines, lineIdx, charIdx, "XMAS") ? 1 : 0;
        xmasCount += upCheck(lines, lineIdx, charIdx) ? 1 : 0;
      }
    }
  }

  console.log(xmasCount);
}

function day4Algorithm2(): void {
  const lines = parseInput() as Array<string>;
  let x_masCount = 0;

  for (let lineIdx = 2; lineIdx < lines.length; ++lineIdx) {
    let line = lines[lineIdx];
    for (let charIdx = 2; charIdx < line.length; ++charIdx) {
      if (
        (line[charIdx] == "S" || "M") &&
        upLeftCheck(lines, lineIdx, charIdx, "MAS") &&
        upRightCheck(lines, lineIdx, charIdx - 2, "MAS")
      ) {
        x_masCount++;
      }
    }
  }

  console.log(x_masCount);
}

day4Algorithm2();
