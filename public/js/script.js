document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.querySelector(".search-bar");
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  const form = document.getElementById("form");
  const apiKey = "sk-QuSe64daf50463a5f1880";

function fetchDataFromAPI() {
  const apiUrl = `GET https://perenual.com/api/species-list?q=${common_name}page=1&key=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok, Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Process the data
      const speciesData = data.data;
      for (const species of speciesData) {
        console.log("Common Name:", species.common_name);
        console.log("Scientific Name:", species.scientific_name[0]);
        console.log("Other Names:", species.other_name.join(", "));
        console.log("Cycle:", species.cycle);
        console.log("Watering:", species.watering);
        console.log("Sunlight:", species.sunlight.join(", "));
        console.log("Image URL:", species.default_image.original_url);
        console.log("===========================");
      }
    })
    .catch(error => {
      console.error("An error occurred:", error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const productContainer = document.querySelector('.product-list');

  fetch(apiUrl) // Replace with the actual API route
    .then(response => response.json())
    .then(products => {
      const source = document.querySelector('#product-template').innerHTML;
      const template = Handlebars.compile(source);
      const context = { products };
      const html = template(context);
      productContainer.innerHTML = html;
    })
    .catch(error => {
      console.error('Error fetching product data:', error);
    });
});


// Call the function to fetch and process data
fetchDataFromAPI();

})
