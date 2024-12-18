"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
// a > b < c < d
//
function day2Algorithm2() {
    var reports = parseInput();
    var maxDiff = 3;
    var minDiff = 1;
    var goodReportsCount = 0;
    var tempReports = -1;
    var usedProblemDampener = false;
    for (var reportIdx = 0; reportIdx < reports.length; ++reportIdx) {
        var r = reports[reportIdx];
        usedProblemDampener = tempReports > -1 ? usedProblemDampener : false;
        var prevDesc = r[1] - r[0] < 0;
        var desc = r[1] - r[0] < 0;
        var safe = true;
        for (var levelIdx = 1; levelIdx < r.length; ++levelIdx) {
            var levelDiff = Math.abs(r[levelIdx] - r[levelIdx - 1]);
            desc = r[levelIdx] - r[levelIdx - 1] < 0;
            if (levelDiff > maxDiff || levelDiff < minDiff || desc != prevDesc) {
                safe = false;
                if (usedProblemDampener) {
                    break;
                }
                usedProblemDampener = true;
                var withoutSingleValues = [];
                var numberOfTries = levelIdx > 1 ? 3 : 2;
                tempReports = numberOfTries;
                for (var i = 0; i < numberOfTries; ++i) {
                    var currentReport = __spreadArray([], r, true);
                    currentReport.splice(levelIdx - i, 1);
                    withoutSingleValues.push(__spreadArray([], currentReport, true));
                }
                reports.splice.apply(reports, __spreadArray([reportIdx, 1], withoutSingleValues, false));
                reportIdx--;
                break;
            }
            prevDesc = desc;
        }
        if (tempReports > -1)
            tempReports--;
        if (safe) {
            goodReportsCount++;
            reportIdx += Math.max(tempReports + 1, 0);
            tempReports = -1;
        }
    }
    console.log(goodReportsCount);
}
day2Algorithm2();
//# sourceMappingURL=day2.js.map