const postcode = "BN11AE";
const apiUrl = `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`;

const statusElement = document.getElementById("status");
const restaurantListElement = document.getElementById("restaurant-list");

async function fetchRestaurants() {
  try {
    const response = await fetch("/api/restaurants");
    const restaurants = await response.json();

    statusElement.textContent = "";
    renderRestaurants(restaurants);
  } catch (error) {
    console.error(error);
    statusElement.textContent = "Something went wrong while loading restaurants.";
  }
}

function renderRestaurants(restaurants) {
  restaurantListElement.innerHTML = "";

  restaurants.forEach((restaurant) => {
    const article = document.createElement("article");
    article.innerHTML = `
      <h2>${restaurant.name}</h2>
      <p><strong>Cuisines:</strong> ${restaurant.cuisines}</p>
      <p><strong>Rating:</strong> ${restaurant.rating}</p>
      <p><strong>Address:</strong> ${restaurant.address}</p>
    `;
    restaurantListElement.appendChild(article);
  });
}

fetchRestaurants();