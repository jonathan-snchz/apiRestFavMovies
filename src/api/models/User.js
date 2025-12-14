const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {type: String, trim: true, required: true, unique: true},
    email:{type: String, trim: true, required: true, unique: true},
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
        type: String, trim: true, required: false, default: 'https://res.cloudinary.com/ddg5tziiv/image/upload/v1765649767/Sample_User_Icon_bjt4fd.png',
    },
    // DATO RELACIONAL
    favMovies:[{
        type: mongoose.Types.ObjectId,
        ref: 'movies',
    }]
},{
    timestamps: true,
})

userSchema.pre('save', function (next){
    if(this.isNew || this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, 10)
    }
    next()
})

const User = mongoose.model('users', userSchema)

module.exports = User