const API_KEY = "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";
const PROMPT_STORAGE_KEY = "dailyartprompt";
const TIMESTAMP_STORAGE_KEY = "lastprompttimestamp";

function isNewDay(){
    const lastTimestamp = localStorage.getItem(TIMESTAMP_STORAGE_KEY);
    if (!lastTimestamp) 
        return True;
    const lastDate = new Date(parseInt(lastTimestamp));
    const now = new Date();
    return now.toLocaleDateString("en-US", { timeZone: "America/Los_Angeles"}) !== lastDate.toLocaleDateString("en-US", { timeZone: "America/Los_Angeles"});


    
    
};

async function fetchArtPrompt(){
    const prompt = "Give me a creative drawing idea for an art challenge.";
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4",  // Use "gpt-3.5-turbo" if you prefer
            messages: [{ role: "user", content: prompt }],
            max_tokens: 50
        })
    });
    const data = await response.json();
    return data.choices[0].message.content.trim();
};

async function displayArtPrompt(){
    const promptContainer = document.getElementById('prompt-text');
    promptContainer.innerHTML = "Loading..."
    if (isNewDay()){
        try {
           const newPrompt = await fetchArtPrompt();
           localStorage.setItem(PROMPT_STORAGE_KEY, newPrompt);
           localStorage.setItem(TIMESTAMP_STORAGE_KEY, Date.now().toString());
           promptContainer.innerText = newPrompt;
        } catch(error){
            console.error("Error fetching Art Prompt",error);
            promptContainer.innerText = localStorage.getItem(PROMPT_STORAGE_KEY);
        }

    }
    
};

document.addEventListener("DOMContentLoaded", displayArtPrompt);

