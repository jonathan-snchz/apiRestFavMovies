const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {type: String, trim: true, required: true},
    email:{type: String, trim: true, required: true},
    password: {
        type: String, 
        trim: true, 
        required: true,
        minlength: [4, 'Password has to be at least 4 characters long']
    },
    role: {
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user'
    },
    image:{
        type: String, trim: true, required: false,
    },
    // DATO RELACIONAL
    favMovies:[{
        type: mongoose.Types.ObjectId,
        ref: 'movies',
    }]
},{
    timestamps: true,
})

const User = mongoose.model('users', userSchema)

module.exports = User