const API_KEY = "956b936efc9309f1d2fdca5ec2605d98243bd74e5afc8a24c04bb4fb21a88e88";
const PROMPT_STORAGE_KEY = "dailyartprompt";
const TIMESTAMP_STORAGE_KEY = "lastprompttimestamp";

function isNewDay(){
    const lastTimestamp = localStorage.getItem(TIMESTAMP_STORAGE_KEY);
    if (!lastTimestamp) 
        return true;
    const lastDate = new Date(parseInt(lastTimestamp));
    const now = new Date();
    return now.toLocaleDateString("en-US", { timeZone: "America/Los_Angeles"}) !== lastDate.toLocaleDateString("en-US", { timeZone: "America/Los_Angeles"});


    
    
};

async function fetchArtPrompt() {
    try {
        const prompt = "Give me a creative drawing idea for an art challenge. It should be one sentence long, and will be displayed on the frontend of a website.";
        const response = await fetch("https://api.together.ai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "meta-llama/Llama-3.1-8B-Instruct-Turbo",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 50
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        
        // Check if the response has the expected structure
        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('Unexpected API response format');
        }

        return data.choices[0].message.content;
    } catch (error) {
        console.error("Error in fetchArtPrompt:", error);
        return "Draw something that inspires you today!"; // Fallback prompt
    }
}

async function displayArtPrompt() {
    const promptContainer = document.getElementById('prompt-text');
    if (!promptContainer) {
        console.error("Prompt container element not found");
        return;
    }

    promptContainer.innerHTML = "Loading...";
    
    if (isNewDay()) {
        try {
            const newPrompt = await fetchArtPrompt();
            localStorage.setItem(PROMPT_STORAGE_KEY, newPrompt);
            localStorage.setItem(TIMESTAMP_STORAGE_KEY, Date.now().toString());
            promptContainer.innerText = newPrompt;
        } catch (error) {
            console.error("Error fetching Art Prompt", error);
            promptContainer.innerText = "Draw something that inspires you today!"; // Fallback prompt
        }
    } else {
        // Load existing prompt from localStorage
        const savedPrompt = localStorage.getItem(PROMPT_STORAGE_KEY);
        promptContainer.innerText = savedPrompt || "Draw something that inspires you today!";
    }
}

document.addEventListener("DOMContentLoaded", displayArtPrompt);

