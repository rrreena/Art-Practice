async function updatePrompt(){
  const promptContainer = document.getElementById('prompt-text');
  promptContainer.innerHTML = "Loading...";

  try {
    const prompt = await fetchArtPrompt();
    promptContainer.innerText = prompt;
  }
  catch(error){
    console.error("Display Error: ", error)
    promptContainer.innerText = "Failed to load prompt."
  }
  const now = new Date();
  
  // Get current time and calculate next update time (midnight)
  const tomorrow = new Date(now);
  tomorrow.setHours(24, 0, 0, 0);
  
  // Calculate time remaining
  const timeRemaining = tomorrow - now;
  
  
  // Update countdown
  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  document.getElementById('countdown').textContent = 
      `Time until next challenge: ${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`;
}

// Update every minute
setInterval(updatePrompt, 60000);
// Initial update
updatePrompt();

const submissions = [
  {
      title: 'Drawing 1',
      image: 'assets/pic1.jpg',
      prompt: 'Prompt 1'
    },
    {
      title: 'Drawing 2',
      image: 'assets/pic2.jpg',
      prompt: 'Prompt 2'
    },
    {
      title: 'Drawing 3',
      image: 'assets/pic3.jpg',
      prompt: 'Prompt 3'
    },
    {
      title: 'Drawing 4',
      image: 'assets/pic4.jpg',
      prompt: 'Prompt 4'
    },
    {
      title: 'Drawing 5',
      image: 'assets/pic5.jpg',
      prompt: 'Prompt 5'
    }
];

function loadSubmissions() {
  const historyList = document.getElementById('submissions-gallery');
  historyList.innerHTML = '';

  submissions.forEach(submission => {
    const col = document.createElement('div');
    col.classList.add('col');

    const submissionItem = document.createElement('div');
    submissionItem.classList.add('submission-item');

    const image = document.createElement('img');
    image.src = submission.image;
    image.alt = submission.title;

    const title = document.createElement('h5');
    title.textContent = submission.title;

    const prompt = document.createElement('p');
    prompt.textContent = `Under: ${submission.prompt}`;

    submissionItem.appendChild(image);
    submissionItem.appendChild(title);
    submissionItem.appendChild(prompt);

    col.appendChild(submissionItem);
    historyList.appendChild(col);
  });
}
loadSubmissions();