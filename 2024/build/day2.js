"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var file = fs.readFileSync("2024/input/day2Input.txt");
function parseInput() {
    var result = new Array();
    result = file
        .toString()
        .split(/\r?\n/)
        .map(function (r) {
        return r.split(/\s+/).map(function (s) { return Number.parseInt(s); });
    });
    return result;
}
function day2Algorithm() {
    var reports = parseInput();
    var maxDiff = 3;
    var minDiff = 1;
    var goodReportsCount = 0;
    reports.forEach(function (r) {
        var prevDesc = r[1] - r[0] < 0;
        var desc = r[1] - r[0] < 0;
        for (var levelIdx = 1; levelIdx < r.length; ++levelIdx) {
            var levelDiff = Math.abs(r[levelIdx] - r[levelIdx - 1]);
            desc = r[levelIdx] - r[levelIdx - 1] < 0;
            if (desc != prevDesc)
                return;
            //If the report is bad we skip to the next one in the array
            if (levelDiff > maxDiff || levelDiff < minDiff)
                return;
            prevDesc = desc;
        }
        goodReportsCount++;
    });
    console.log(goodReportsCount);
}
day2Algorithm();
//# sourceMappingURL=day2.js.map