const runButton = document.getElementById("runButton");
const textInput = document.getElementById("textInput");
const queryInput = document.getElementById("queryInput");
const status = document.getElementById("status");
const results = document.getElementById("results");

function pretty(value) {
    return JSON.stringify(value, null, 2);
}

runButton.addEventListener("click", async () => {
    const text = textInput.value;
    const query = queryInput.value;

    if (!text.trim() || !query.trim()) {
        status.textContent = "Please enter both the text and search word(s).";
        return;
    }

    runButton.disabled = true;
    status.textContent = "Running all five problems...";
    results.classList.add("hidden");

    try {
        const response = await fetch("/api/run", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, query })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.error || "Execution failed.");
        }

        document.getElementById("p1Output").textContent = pretty(data.results.problem1);
        document.getElementById("p2Output").textContent = pretty(data.results.problem2);
        document.getElementById("p3Output").textContent =
            data.results.problem3.length
                ? data.results.problem3.join(", ")
                : "No matching lines";

        document.getElementById("p4Output").textContent =
            data.results.problem4.length
                ? data.results.problem4.join(", ")
                : "No matching lines";

        document.getElementById("p5Output").textContent = pretty(data.results.problem5);

        results.classList.remove("hidden");
        status.textContent = "All five problems completed successfully.";
    } catch (error) {
        status.textContent = error.message;
    } finally {
        runButton.disabled = false;
    }
});
