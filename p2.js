const fs = require('fs');
let input = fs.readFileSync(0, 'utf-8');
if (input.endsWith('\n')) {
    input = input.slice(0, -1);
}

const lines = input.split('\n');
const results = [];
let index = {};
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') {
        continue;
    } else {
        const words = line
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
}
results.push(index);
console.log(JSON.stringify(results));
