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