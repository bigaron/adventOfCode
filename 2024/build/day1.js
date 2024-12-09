"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var file = fs.readFileSync('2024/input/day1Input.txt');
var inputStr = "";
var input = new Array();
var parseInput = function () {
    var row;
    inputStr = file.toString();
    input[0] = new Array();
    input[1] = new Array();
    var rows = inputStr.split(/\r?\n/);
    rows.forEach(function (r) {
        var row = r.split(/\s+/).map(function (s) { return Number.parseInt(s); });
        input[0].push(row[0]);
        input[1].push(row[1]);
    });
    input[0].sort();
    input[1].sort();
};
var day1Algorithm = function () {
    parseInput();
    var distance = 0;
    for (var i = 0; i < input[0].length; ++i) {
        distance += Math.abs(input[0][i] - input[1][i]);
    }
    return distance;
};
console.log(day1Algorithm());
//# sourceMappingURL=day1.js.map