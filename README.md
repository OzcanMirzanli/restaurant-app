# Local Restaurants

A small web application built for the Just Eat Takeaway Early Careers coding assignment.

The application fetches restaurant data from the provided API through a small Express backend and displays the first 10 restaurants for a selected UK postcode.

## Features

- Displays the first 10 restaurants returned by the API
- Shows the required restaurant data:
  - Name
  - Cuisines
  - Rating
  - Address
- Filters out non-cuisine tags such as promotional labels
- Uses a small Express backend to fetch and format the API data
- Includes a responsive layout for smaller screens

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- Node.js
- Express

## Project Structure

restaurant-app/
public/
index.html
script.js
style.css
server.js
package.json
package-lock.json
.gitignore
README.md

## How to Run the Project

1. Install dependencies by running `npm install`
2. Start the server by running `node server.js`
3. Open `http://localhost:3000` in your browser

## How It Works

The frontend is served from the `public` folder using Express.

When the page loads, the frontend sends a request to `/api/restaurants`.

The backend then:

1. Fetches restaurant data from the Just Eat Takeaway API for the postcode `BN11AE`
2. Takes only the first 10 restaurants
3. Maps each restaurant into a simplified object
4. Returns only the data needed by the frontend:
   - name
   - cuisines
   - rating
   - address

The frontend then renders that data as restaurant cards on the page.

## Design and Architecture Choices

I chose to build the frontend with plain HTML, CSS, and vanilla JavaScript because the assignment is small and focused. I wanted to keep the solution lightweight, readable, and easy to explain.

I also added a small Node.js and Express backend. My initial idea was to fetch the API directly from the browser, but that request was blocked by CORS. Because of that, I moved the API request to the backend and exposed a simple local route for the frontend to use.

The backend is responsible for:

- fetching the external API data
- formatting the restaurant data
- filtering out non-cuisine tags
- returning a cleaner response to the frontend

The frontend is responsible for:

- requesting the restaurant data
- rendering the restaurant cards
- showing a fallback error message if something goes wrong

## Assumptions

- The provided API endpoint is the correct source of truth for restaurant data
- The postcode is fixed to `BN11AE` for this implementation
- The `cuisines` field from the API may include values that are not actual cuisines, such as promotional tags
- Only the first 10 restaurants should be displayed, as requested in the assignment
- If some data is missing, fallback text such as `No cuisines available` or `No address available` is acceptable

## Things That Were Not Fully Clear

One thing that was not fully clear at first was that the API response in the `cuisines` field also included non-cuisine values such as `Deals` and `Collect stamps`. Because of that, I decided to filter out those values so the displayed cuisines would be cleaner and more meaningful.

Another technical issue was that the API could not be fetched directly from the browser due to CORS, so I solved that by introducing a small Express backend.

## Improvements I Would Make With More Time

- Add a postcode input field so the user can search different UK postcodes
- Add unit tests for helper functions such as cuisine and address formatting
- Improve loading and error states visually
- Add slightly more polished card styling and hover states
- Improve accessibility further, for example with clearer semantic structure and enhanced focus styles
- Make the filtering of non-cuisine tags more configurable

## Notes

This project is intentionally small and focused on the assignment requirements. I aimed to keep the code readable and the structure simple rather than overengineering the solution.
