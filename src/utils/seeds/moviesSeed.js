require('dotenv').config();
const movies = require("../seeds/data/movies");
const Movie = require("../../api/models/Movie");
const mongoose = require("mongoose");
const fetchMovie = require("../tmdbApiCall");

mongoose
    .connect(process.env.DB_URL)
    .then(async () => {
        console.log("Conected to the database");        
        
        // Buscamos todas las pelis
        
        const allMovies = await Movie.find();
        console.log("Movies found");
        
        // Comprobamos si había y borramos

        if (allMovies.length) {
            console.log("Deleting movies...");
            await Movie.collection.drop();          
        }
    })
    .catch((err) => console.log(`Error deleting data: ${err}`))
    .then(async () => {

        // Poblamos con las pelis del array
        
        const moviesArray = []

        for (const movie of movies) {
            
            const tmdbData = await fetchMovie(movie.title);
            
            moviesArray.push({
                title: movie.title,
                categories: movie.categories,
                year: tmdbData.year,
                img: tmdbData.img,
                tmdbScore: tmdbData.score
            })
        }

        await Movie.insertMany(moviesArray);
    })
    .catch((err) => console.log(`Error deleting data: ${err}`))

    // Desconectamos
    
    .finally(() => {
        console.log("Disconecting, goodbye!");
        mongoose.disconnect()
    }); 
