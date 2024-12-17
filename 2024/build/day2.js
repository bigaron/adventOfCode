"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var file = fs.readFileSync("2024/input/day2Test.txt");
var fileRows = new Array();
var safeReports = new Array();
function parseInput() {
    file
        .toString()
        .split(/\r?\n/)
        .forEach(function (r) {
        fileRows.push(r.split(/\s+/).map(function (v) { return Number.parseInt(v); }));
    });
}
function day2Algorithm() {
    parseInput();
    var maxDist = 3;
    var minDist = 1;
    var accum = 0;
    fileRows.forEach(function (r) {
        var desc = r[0] - r[1] < 0;
        var safe = true;
        for (var i = 0; i < r.length - 1; ++i) {
            var diff = r[i] - r[i + 1];
            if ((diff < 0 && !desc) || (diff > 0 && desc))
                safe = false;
            diff = Math.abs(diff);
            if (diff < 1 || diff > 3)
                safe = false;
        }
        if (safe)
            accum++;
    });
    console.log(accum);
}
function getLocalMonotonity(list) {
    var result = [0, 0];
    for (var i = 0; i < list.length - 1; ++i) {
        if (list[i] - list[i + 1] > 0)
            result[1]++;
        else if (list[i] - list[i + 1] < 0)
            result[0]++;
    }
    return result;
}
function day2Algorithm2() {
    parseInput();
    var maxDist = 3;
    var minDist = 1;
    var accum = 0;
    var asc = false;
    fileRows.forEach(function (r) {
        var result = getLocalMonotonity(r);
        var ascCount = result[0];
        var descCount = result[1];
        var diff = Math.abs(ascCount - descCount);
        if (diff < Math.max(ascCount, descCount) - 1)
            return;
        asc = ascCount > descCount;
        accum++;
    });
}
// --- low ---
// 249
day2Algorithm2();
//# sourceMappingURL=day2.js.map