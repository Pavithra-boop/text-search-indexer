const { spawnSync } = require("child_process");
const path = require("path");

function runProgram(fileName, input) {
    const filePath = path.join(__dirname, fileName);

    const result = spawnSync(process.execPath, [filePath], {
        input,
        encoding: "utf8",
        maxBuffer: 1024 * 1024 * 100
    });

    if (result.error) {
        throw result.error;
    }

    if (result.status !== 0) {
        throw new Error(result.stderr || `${fileName} exited with code ${result.status}`);
    }

    return JSON.parse(result.stdout);
}

function runAll(text, query) {
    if (typeof text !== "string" || !text.trim()) {
        throw new Error("Please provide input text.");
    }

    if (typeof query !== "string" || !query.trim()) {
        throw new Error("Please provide at least one search word.");
    }

    // P1/P2 use only the text.
    const textInput = text.endsWith("\n") ? text : text + "\n";

    // P3/P4/P5 expect the search query on the final input line.
    const searchInput = text.replace(/\r/g, "") + "\n" + query.trim() + "\n";

    const p1 = runProgram("p1.js", textInput);
    const p2 = runProgram("p2.js", textInput);
    const p3 = runProgram("p3.js", searchInput);
    const p4 = runProgram("p4.js", searchInput);
    const p5 = runProgram("p5.js", searchInput);

    return {
        problem1: p1,
        problem2: p2[0] || {},
        problem3: (p3[0] || []).map(line => line + 1),
        problem4: (p4[0] || []).map(line => line + 1),
        problem5: p5
    };
}

module.exports = { runAll };
