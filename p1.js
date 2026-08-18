const fs = require('fs');
let input = fs.readFileSync(0, 'utf-8');
if (input.endsWith('\n')) {
    input = input.slice(0, -1);
}

const lines = input.split('\n');
const results = [];
for (const line of lines) {
    let result;
    if (line.trim() === '') {
        result = {"words": []};
    } else {
        const words = line
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .trim()
            .split(/\s+/)
            .filter(word => word.length > 0);
        result = { "words": words };
         //result = {"words": []};
    }
    results.push(result);
}
console.log(JSON.stringify(results));
