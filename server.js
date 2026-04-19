const express = require("express");

const app = express();
const PORT = 3000;
const POSTCODE = "BN11AE";
const EXCLUDED_CUISINE_TAGS = ["Collect stamps", "Deals"];

app.use(express.static("public"));

app.get("/api/restaurants", async (req, res) => {
  try {
    const data = await fetchRestaurantData(POSTCODE);
    const restaurants = mapRestaurants(data.restaurants || []);

    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

async function fetchRestaurantData(postcode) {
  const response = await fetch(
    `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
  );

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}

function mapRestaurants(restaurants) {
  return restaurants.slice(0, 10).map((restaurant) => ({
    name: restaurant.name || "No name available",
    cuisines: formatCuisines(restaurant.cuisines),
    rating: restaurant.rating?.starRating ?? "No rating available",
    address: formatAddress(restaurant.address),
  }));
}

function formatCuisines(cuisines) {
  if (!Array.isArray(cuisines)) {
    return "No cuisines available";
  }

  const filteredCuisines = cuisines
    .map((cuisine) => cuisine.name)
    .filter((name) => !EXCLUDED_CUISINE_TAGS.includes(name));

  return filteredCuisines.join(", ") || "No cuisines available";
}

function formatAddress(address) {
  if (!address) {
    return "No address available";
  }

  const formattedAddress = [address.firstLine, address.city, address.postalCode]
    .filter(Boolean)
    .join(", ");

  return formattedAddress || "No address available";
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
