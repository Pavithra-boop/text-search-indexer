const fs = require('fs');

let input = fs.readFileSync(0, 'utf-8').replace(/\r/g, '');

const lines = input.trim().split('\n');

// Last line is the search query
const query = lines[lines.length - 1].trim();

// Remaining lines are the text
const textLines = lines.slice(0, -1);

// Build the index
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

// Search keywords
const keywords = query
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 0);

const counts = {};

for (const keyword of keywords) {

    const matchingLines = index[keyword] || [];

    let totalCount = 0;

    for (const lineIndex of matchingLines) {

        const words = textLines[lineIndex]
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .trim()
            .split(/\s+/);

        for (const word of words) {

            if (word === keyword) {
                totalCount++;
            }
        }
    }

    counts[keyword] = totalCount;
}

console.log(JSON.stringify(counts));
