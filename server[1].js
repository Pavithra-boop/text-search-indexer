const express = require("express");
const path = require("path");
const { runAll } = require("./main");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/run", (req, res) => {
    try {
        const { text, query } = req.body;
        const results = runAll(text, query);
        res.json({ success: true, results });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            error: error.message || "Execution failed."
        });
    }
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`Text Search Indexer running on port ${PORT}`);
});