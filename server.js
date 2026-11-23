
const express = require("express");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

const todoRoutes = require("./routes/todoRoutes");

dotenv.config();

const app = express();

// Middleware

app.use(express.json());

// Connect MongoDB

connectDB();

// Serve frontend files

app.use(express.static("public"));

// Todo API routes

app.use("/api/todos", todoRoutes);

// Start server

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
