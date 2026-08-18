const fs = require('fs');

let input = fs.readFileSync(0, 'utf-8').replace(/\r/g, '');

const lines = input.trim().split('\n');

// Last line contains the search keywords
const keywords = lines[lines.length - 1]
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 0);

// Remaining lines are the text
const textLines = lines.slice(0, -1);

// Build the word-to-line index
const index = {};

for (let i = 0; i < textLines.length; i++) {

    const words = textLines[i]
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 0);

    const uniqueWords = [...new Set(words)];

    for (const word of uniqueWords) {

        if (!index[word]) {
            index[word] = [];
        }

        index[word].push(i);
    }
}

// AND search
const result = keywords.reduce((acc, keyword) => {

    const matchingLines = index[keyword] || [];

    if (acc === null) {
        return matchingLines;
    }

    return acc.filter(line => matchingLines.includes(line));

}, null);

// If no keywords or no matching lines
const found_lines = result || [];

console.log(JSON.stringify([found_lines]));
