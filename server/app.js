const express = require("express");
const cors = require("cors");
const app = express();

// Importing routes
const userRoutes = require("./Routes/user");
const documentRoutes = require("./Routes/document");

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/document", documentRoutes);

module.exports = app;
