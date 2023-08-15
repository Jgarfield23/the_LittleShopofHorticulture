document.addEventListener('DOMContentLoaded', () => {
    const apiDataContainer = document.getElementById('api-data');
  
    fetch('/api/plants') // Replace 'plants' with the desired API endpoint
      .then(response => response.json())
      .then(data => {
        // Display the fetched data on the website
        apiDataContainer.textContent = JSON.stringify(data, null, 2);
      })
      .catch(error => {
        console.error('Error fetching API data:', error);
        apiDataContainer.textContent = 'An error occurred while fetching API data.';
      });
  });
  