"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var file = fs.readFileSync('2024/input/day2Input.txt');
var fileRows = new Array();
var safeReports = new Array();
function parseInput() {
    file.toString().split(/\r?\n/).forEach(function (r) {
        fileRows.push(r.split(/\s+/).map(function (v) { return Number.parseInt(v); }));
    });
}
function day2Algorithm() {
    parseInput();
    var maxDist = 3;
    var minDist = 1;
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
        safeReports.push(safe);
    });
    var accum = 0;
    for (var i = 0; i < safeReports.length; ++i) {
        if (safeReports[i])
            accum++;
    }
    console.log(accum);
}
day2Algorithm();
//# sourceMappingURL=day2.js.map