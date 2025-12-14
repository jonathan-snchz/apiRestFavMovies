const fetchMovie = async (movieTitle) => {

    try{
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieTitle)}`;
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${process.env.TMDB_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            const error = new Error('API Failed');
            error.status = response.status;
            throw error;
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            const error = new Error(`No movies found for ${movieTitle}`);
            error.status = 400;
            throw error;
        }

        // Usar siempre el primer resultado
        const movie = data.results[0];

        return {
            score: movie.vote_average,
            img: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            year: movie.release_date.split('-')[0] // El formato original es Año-Mes-Día y solo quiero el año
        }
    } catch (error){
        console.log("API call to TMDB failed ", error);
        
        throw error;
    } 
}

module.exports = fetchMovie;