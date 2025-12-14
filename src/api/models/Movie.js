const { default: mongoose } = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true,},
    categories: [{
        type: String,
        enum:['horror', 'drama', 'comedy', 'thriller', 'crime'],
        lowercase: true,
    }],
    year: {type: String, trim: true},
    img: {type: String, trim: true, required: true},
    tmdbScore: {
        type: Number
    },
},{
    timestamps: true,
})

const Movie = mongoose.model('movies', movieSchema)

module.exports = Movie  