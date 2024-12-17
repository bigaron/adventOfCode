"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var file = fs.readFileSync("2024/input/day4Input.txt");
function parseInput() {
    return file.toString().split(/\r?\n/);
}
function upLeftCheck(lines, startLine, startChar, wordToCheck) {
    //If we are closer to the top or the left than the xmas number is possible we return
    if (lines.length < wordToCheck.length ||
        startLine < wordToCheck.length - 1 ||
        startChar < wordToCheck.length - 1) {
        return false;
    }
    var possibleWord = "";
    for (var i = 0; i < wordToCheck.length; ++i) {
        possibleWord += lines[startLine - i].charAt(startChar - i);
    }
    return (possibleWord == wordToCheck ||
        possibleWord == wordToCheck.split("").reverse().join(""));
}
function upRightCheck(lines, startLine, startChar, wordToCheck) {
    //If we are closer to the top or the left than the xmas number is possible we return
    if (lines.length < wordToCheck.length || startLine < wordToCheck.length - 1)
        return false;
    var possibleWord = "";
    for (var i = 0; i < wordToCheck.length; ++i) {
        // If it overflows we return
        if (startChar + i >= lines[startLine - i].length)
            return false;
        var line = lines[startLine - i];
        var char = line[startChar + i];
        possibleWord += char;
    }
    return (possibleWord == wordToCheck ||
        possibleWord == wordToCheck.split("").reverse().join(""));
}
function upCheck(lines, startLine, startChar) {
    if (lines.length < 4 || startLine < 3)
        return false;
    var possibleWord = "";
    for (var i = 0; i < 4; ++i) {
        var val = lines[startLine - i][startChar];
        possibleWord += val;
    }
    return possibleWord == "XMAS" || possibleWord == "SAMX";
}
function day4Algorithm() {
    var lines = parseInput();
    var xmasCount = 0;
    for (var lineIdx = 0; lineIdx < lines.length; ++lineIdx) {
        var line = lines[lineIdx];
        //Horizontal xmas
        xmasCount += line.split(/XMAS/).length - 1;
        xmasCount += line.split(/SAMX/).length - 1;
        for (var charIdx = 0; charIdx < line.length; ++charIdx) {
            if (line[charIdx] == "X" || line[charIdx] == "S") {
                xmasCount += upLeftCheck(lines, lineIdx, charIdx, "XMAS") ? 1 : 0;
                xmasCount += upRightCheck(lines, lineIdx, charIdx, "XMAS") ? 1 : 0;
                xmasCount += upCheck(lines, lineIdx, charIdx) ? 1 : 0;
            }
        }
    }
    console.log(xmasCount);
}
function day4Algorithm2() {
    var lines = parseInput();
    var x_masCount = 0;
    for (var lineIdx = 2; lineIdx < lines.length; ++lineIdx) {
        var line = lines[lineIdx];
        for (var charIdx = 2; charIdx < line.length; ++charIdx) {
            if ((line[charIdx] == "S" || "M") &&
                upLeftCheck(lines, lineIdx, charIdx, "MAS") &&
                upRightCheck(lines, lineIdx, charIdx - 2, "MAS")) {
                x_masCount++;
            }
        }
    }
    console.log(x_masCount);
}
day4Algorithm2();
//# sourceMappingURL=day4.js.map