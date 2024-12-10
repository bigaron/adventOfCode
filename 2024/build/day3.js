"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var file = fs.readFileSync("2024/input/day3Input.txt");
var lines = new Array();
function parseInput() {
    lines = file.toString().split(/\r?\n/);
}
function parseStrForResult(str) {
    var values = str.split(",");
    values[0] = values[0].replace("mul(", "");
    values[1] = values[1].substring(0, values[1].indexOf(")"));
    return Number.parseInt(values[0]) * Number.parseInt(values[1]);
}
function day3Algorithm() {
    parseInput();
    var accum = 0;
    lines.forEach(function (l) {
        var start = l.search(/mul\([0-9]+,[0-9]+\)/);
        var lenInBaseStr = 0;
        var end = l.indexOf(")", start) + 1;
        var subStr = l;
        while (start != -1) {
            accum += parseStrForResult(l.substring(lenInBaseStr + start, lenInBaseStr + end));
            lenInBaseStr += end;
            subStr = l.substring(lenInBaseStr);
            start = subStr.search(/mul\([0-9]+,[0-9]+\)/);
            end = subStr.indexOf(")", start) + 1;
        }
    });
    console.log(accum);
}
function day3Algorithm2() {
    parseInput();
    var accum = 0;
    var isOn = true;
    var flagStep = false;
    lines.forEach(function (l) {
        var start = l.search(/mul\([0-9]+,[0-9]+\)/);
        var lenInBaseStr = 0;
        var end = l.indexOf(")", start) + 1;
        var subStr = l;
        var changeOnState_Do = subStr.indexOf("do()");
        var changeOnState_Dont = subStr.indexOf("don't()");
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
        while (start != -1) {
            if (isOn && !flagStep) {
                accum += parseStrForResult(l.substring(lenInBaseStr + start, lenInBaseStr + end));
            }
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
        }
    });
    console.log(accum);
}
day3Algorithm2();
//# sourceMappingURL=day3.js.map