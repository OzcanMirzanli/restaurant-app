const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/api/restaurants", async (req, res) => {
  try {
    const postcode = "BN11AE";

    const response = await fetch(
      `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
    );

    const data = await response.json();
    const excludedCuisineTags = ["Collect stamps", "Deals"];

    const restaurants = (data.restaurants || [])
      .slice(0, 10)
      .map((restaurant) => ({
        name: restaurant.name || "No name available",
        cuisines: Array.isArray(restaurant.cuisines)
          ? restaurant.cuisines
              .map((cuisine) => cuisine.name)
              .filter((name) => !excludedCuisineTags.includes(name))
              .join(", ") || "No cuisines available"
          : "No cuisines available",
        rating: restaurant.rating?.starRating ?? "No rating available",
        address:
          [
            restaurant.address?.firstLine,
            restaurant.address?.city,
            restaurant.address?.postalCode,
          ]
            .filter(Boolean)
            .join(", ") || "No address available",
      }));

    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
