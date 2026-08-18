# Text Search Indexer

This project combines the five supplied JavaScript problems into one web application.

## Five problems

1. **P1 — Tokenization:** converts each input line to lowercase tokens and removes non-alphanumeric characters.
2. **P2 — Inverted Index:** maps each word to the lines where it appears.
3. **P3 — Single Word Search:** returns the lines containing one search keyword.
4. **P4 — Multiple Word AND Search:** returns lines containing all supplied keywords.
5. **P5 — Word Frequency Count:** counts exact occurrences of each supplied search keyword.

The original five programs are kept as `p1.js` through `p5.js`. `main.js` runs them in sequence, and the web page provides one input and one Run button.

## Run locally

Requirements: Node.js 18+

```bash
npm install
npm start
```

Open:

```text
http://localhost:3000
```

Enter the text once, enter one or more search words, and click **RUN ALL FIVE PROBLEMS**.

## GitHub + one public URL

1. Create a GitHub repository named `text-search-indexer`.
2. Upload all files and folders from this project.
3. Create a Render Web Service from that GitHub repository.
4. Render uses:
   - Build command: `npm install`
   - Start command: `npm start`
5. Render provides one public URL.
6. Give that URL to your faculty/examiner.

## Important line-number note

The supplied P2/P3/P4 programs internally use JavaScript zero-based line indexes. `main.js` converts the P3/P4 line indexes to human-readable 1-based line numbers only when displaying them in the web application. The tokenization, indexing, search, AND-search, and frequency-count algorithms are otherwise preserved.

## Large inputs

For very large text, browser/server request-size and memory limits can matter. This version is designed to demonstrate the five supplied programs through one web interface. For production-scale millions-of-sentences data, the next optimization would be to build the index once and reuse it for P3/P4/P5 instead of starting each supplied program separately.
