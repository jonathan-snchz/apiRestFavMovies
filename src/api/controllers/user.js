const User = require("../models/User");
const { generateSign } = require("../../utils/jwt");
const bcrypt = require("bcrypt")
const { deleteApiImg } = require("../../utils/deleteApiImg");

async function registerUser(req, res, next) {
  try {
    const user = req.body;
    const userExist = await User.findOne({ email: user.email })
    if (userExist) {
        return res.status(400).json("Error registrando al usuario, el correo ya tiene una cuenta asociada");
    }
    
    const newUser = new User({
        name: user.name,
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
        role: 'user',
        image: req.file ? req.file.path : null,
    })
    
    const userSaved = await newUser.save()
    return res.status(201).json(userSaved)
  } catch (error) {
        return res.status(400).json("Error registrando al usuario");
  }
}

async function logInUser(req, res, next) {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json("Contraseña o usuario incorrectos")
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = generateSign(user._id)
            return res.status(200).json({token, user})
        } else{
            res.status(400).json("Contraseña o usuario incorrectos")
        }
    } catch (error) {
        return res.status(400).json("Error en el login")
    }
}

async function findUser(req, res, next) {
    try{
        const {id} = req.params;
        const user = await  User.findById(id).select("-password").populate("favMovies")

        return res.status(200).json(user)
    } catch (error){
        return res.status(400).json("No se ha encontrado el usuario")   
    }
}
async function getUsers(req, res, next) {
      try {
        const users = await User.find().select("-password").populate("favMovies");
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json("error");
    }
}
async function deleteUser(req, res, next) {
    try {
        const {id} = req.params;

        const userDeleted = await User.findByIdAndDelete(id);
        deleteApiImg(userDeleted.image);
        return res.status(200).json(`Deleted the user: ${userDeleted}`)        
    } catch (error) {
        return res.status(400).json(error);
    }
}
async function updateUser(req, res, next) {
    const {id} = req.params;
    const userUpdates = req.body;
    const {role, ...allowedUpdates} = userUpdates;
    
    if (allowedUpdates.password) {
        allowedUpdates.password = await bcrypt.hash(allowedUpdates.password, 10)
    }
    if (req.file) {
        const user = await User.findById(id);
        if (user.image) {
            deleteApiImg(user.image)   
        }
        allowedUpdates.image = req.file.path;
    }
    const updatedUser = await User.findByIdAndUpdate(id, allowedUpdates, {new: true});

    return res.status(200).json(updatedUser);
}
async function updateRole(req, res, next) {
    const {id} = req.params;
    const {role} = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, {
        role: role
    }, {new:true});

    return res.status(201).json(updatedUser)
}
async function updateFavMovies(req, res, next) {
    const {id} = req.params;
    const {movieId} = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, {
        $addToSet: {favMovies: movieId}
    }, {new:true}).populate("favMovies");
    
    return res.status(201).json(updatedUser.favMovies)
}
async function deleteFavMovie(req, res, next) {
    const {id} = req.params;
    const {movieId} = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, {
        $pull: {favMovies: movieId}
    }, {new:true}).populate("favMovies");
    
    return res.status(200).json(updatedUser.favMovies)
}
module.exports = { 
    registerUser, 
    logInUser, 
    findUser,
    getUsers,
    deleteUser,
    updateUser,
    updateRole,
    updateFavMovies,
    deleteFavMovie
}