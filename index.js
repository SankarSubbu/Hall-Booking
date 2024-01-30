const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./route");

// Check for .env file existence and handle errors
try {
  app.use("dotenv").config(".env");
} catch (error) {
  console.error("Error loading .env file:", error);
  process.exit(1); // Exit with an error code
}

// Apply CORS middleware (adjust origin as needed)
app.use(cors({ origin: "http://localhost:3000" })); // Example origin for development

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use("/", route);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).send("Page not found");
});

// Get PORT from environment variable with a default
const port = process.env.PORT || 2000; // Use lowercase for consistency

// Start the server with error handling
app.listen(port, () => {
  console.log(`Server listening on PORT ${port}`);
})
.on("error", (error) => {
  console.error("Server error:", error);
  process.exit(1); // Exit with an error code
});
