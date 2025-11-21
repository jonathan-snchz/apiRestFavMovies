const fetchMovie = require('../../utils/tmdbApiCall');
const Movie = require('../models/Movie');

const getMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find();
        return res.status(200).json(movies);
    } catch (error) {
        return res.status(400).json("error");
    }
}

const postMovies = async (req, res, next) => {
    try {
        const movie = req.body;
        const movieExist = await Movie.findOne({ title: movie.title })
        if (movieExist) {
            return res.status(400).json("error registrando al usuario");
        }
        const tmdbData = await fetchMovie(movie.title);

        const newMovie = new Movie({
            title: movie.title,
            categories: movie.categories,
            year: tmdbData.year,
            img: tmdbData.img,
            tmdbScore: tmdbData.score,
        })
        const movieSaved = await newMovie.save();
        return res.status(201).json(movieSaved);
    } catch (error) {
        return res.status(400).json("error");
    }
}
const updateMovies = async (req, res, next) => {
    try {
        const { id } = req.params;
        const movieUpdates = req.body;
        // Si actualizamos el título volvemos a crear la película
        if (movieUpdates.title) {
            const tmdbData = await fetchMovie(movieUpdates.title);
            
            const updatedMovie = await Movie.findByIdAndUpdate(id, {
                title: movieUpdates.title,
                categories: movieUpdates.categories,
                year: tmdbData.year,
                img: tmdbData.img,
                tmdbScore: tmdbData.score
            }, {new: true});

            return res.status(200).json(updatedMovie);
        } else {
            // Si solo cambiamos las categorías las actualizamos sin cambiar nada más
            const updatedMovie = await Movie.findByIdAndUpdate(id, {
                categories: movieUpdates.categories
            }, {new: true});

            return res.status(200).json(updatedMovie);
        }

    } catch (error) {
        return res.status(400).json("error");
    }
}

const deleteMovies = async (req, res, next) => {
    try {
        const { id } = req.params;
        const movieDeleted = await Movie.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Elemento eliminado",
            elemento: movieDeleted
        })
    } catch (error) {
        return res.status(400).json("error");
    }
}


module.exports = {
    getMovies,
    postMovies,
    updateMovies,
    deleteMovies
}