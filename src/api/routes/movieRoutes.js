const { getMovies, postMovies, deleteMovies, updateMovies } = require('../controllers/movie');

const moviesRouter = require('express').Router();

moviesRouter.get("/", getMovies);
moviesRouter.post("/", postMovies);
moviesRouter.delete("/:id", deleteMovies);
moviesRouter.put("/:id", updateMovies);

module.exports = moviesRouter