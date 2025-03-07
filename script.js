document.addEventListener('DOMContentLoaded', function() {
  const generateButton = document.getElementById('generate-haiku');
  const haikuDisplay = document.getElementById('haiku-display');
  const loadingIndicator = document.getElementById('loading-indicator');
  
  generateButton.addEventListener('click', generateHaiku);
  
  async function generateHaiku() {
    try {
      // Show loading indicator and disable button
      if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
      }
      generateButton.disabled = true;
      haikuDisplay.innerHTML = '';
      
      // Make API call to backend
      const response = await fetch('/generate-haiku', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          topic: document.getElementById('topic-input').value || 'ai' // Use custom topic or default to 'ai'
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Display the haiku with line breaks
      const haikuLines = data.haiku.split('\n');
      const haikuHTML = haikuLines.map(line => `<p>${line}</p>`).join('');
      haikuDisplay.innerHTML = haikuHTML;
      
    } catch (error) {
      console.error('Error generating haiku:', error);
      haikuDisplay.innerHTML = `<p class="error">Failed to generate haiku: ${error.message}</p>`;
    } finally {
      // Hide loading indicator and re-enable button
      if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
      }
      generateButton.disabled = false;
    }
  }
});

