const express = require('express');
const { connectDB } = require('./src/config/db');
const moviesRouter = require('./src/api/routes/movieRoutes');
const usersRouter = require('./src/api/routes/userRoutes');
require('dotenv').config();

const app = express();
const PORT = 3000;

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET, 
    api_key: process.env.CLOUDINARY_API_KEY
})

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/movies', moviesRouter);

app.use((req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
	return res.status(err.status || 500).json(err.message || 'Unexpected error');
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
