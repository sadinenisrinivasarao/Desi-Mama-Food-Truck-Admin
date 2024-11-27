const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({ path: '.env' });

// Log requests
app.use(morgan('tiny'));

// MongoDB connection
connectDB();

// Parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");

// Set views folder
app.set('views', path.join(__dirname, 'views'));

// Serve static assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// Lazy Load API with Pagination
app.get('/api/foodItems', async (req, res) => {
    try {
        // Extract pagination parameters from query string
        const { page = 1, limit = 10 } = req.query; // Defaults: page=1, limit=10

        // Fetch data from your database (MongoDB example)
        const FoodItem = require('./server/models/FoodItem'); // Your model
        const foodItems = await FoodItem.find()
            .limit(Number(limit)) // Limit number of items
            .skip((Number(page) - 1) * Number(limit)) // Skip for pagination
            .exec();

        // Get total count of documents
        const totalCount = await FoodItem.countDocuments();

        res.json({
            foodItems,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: Number(page),
        });
    } catch (error) {
        console.error("Error fetching food items:", error);
        res.status(500).json({ error: "Error fetching food items" });
    }
});

// Render Home Page with Lazy Loading Frontend
app.get('/', async (req, res) => {
    try {
        // Fetch only the first page of data for initial render
        const page = 1;
        const limit = 10;

        const response = await axios.get(`http://localhost:${process.env.PORT || 3000}/api/foodItems?page=${page}&limit=${limit}`);
        const { foodItems, totalPages } = response.data;

        res.render('index', {
            foodItems,
            totalPages,
            currentPage: page,
        });
    } catch (err) {
        console.error("Error rendering home page:", err);
        res.status(500).send("Error loading home page");
    }
});

// Load routes
app.use('/', require('./server/routes/router'));

// Export app for serverless environments (like Vercel)
module.exports = app;
