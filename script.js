document.addEventListener('DOMContentLoaded', () => {
  const words = [
    "ephemeral", "solitude", "serendipity", "mellifluous", "nostalgia",
    "sonder", "petrichor", "eloquence", "luminescence", "ineffable",
    "limerence", "ethereal", "plethora", "ubiquitous", "epiphany",
    "pragmatic", "veracity", "zenith", "nadir", "quixotic"
  ];

  // Pick a word based on the day of the year
  const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  const dayIndex = getDayOfYear();
  const wordOfTheDay = words[dayIndex % words.length];

  // Fetch the definition from the free Dictionary API
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordOfTheDay}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const wordData = data[0];
      const firstMeaning = wordData.meanings[0];

      document.getElementById('word').textContent = wordData.word;
      document.getElementById('phonetic').textContent = wordData.phonetic || '';
      document.getElementById('partOfSpeech').textContent = firstMeaning.partOfSpeech;
      document.getElementById('definition').textContent = firstMeaning.definitions[0].definition;

      // Show the content
      document.getElementById('loading').classList.add('hidden');
      document.getElementById('content').classList.remove('hidden');
    })
    .catch(error => {
      console.error('Error fetching word data:', error);
      document.getElementById('loading').classList.add('hidden');
      document.getElementById('error').classList.remove('hidden');
    });
});
