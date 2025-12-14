const { isAuth, adminOwner, isAdmin } = require('../../middlewares/auth');
const upload = require('../../middlewares/imgUpload');
const { registerUser, logInUser, findUser, getUsers, updateUser, updateFavMovies, updateRole, deleteUser, deleteFavMovie, updatePassword } = require('../controllers/user');

const usersRouter = require('express').Router();

// no auth
usersRouter.post("/register", upload.single('image'), registerUser);
usersRouter.post("/login", logInUser);

// auth
usersRouter.get("/:id", isAuth, findUser)
usersRouter.get("/", isAuth, getUsers);

// auth y admin o mismo usuario
usersRouter.put("/:id", isAuth, adminOwner, upload.single("image"), updateUser);
usersRouter.put("/:id/favourites", isAuth, adminOwner, updateFavMovies);
usersRouter.put("/:id/password", isAuth, adminOwner, updatePassword);
usersRouter.delete("/:id", isAuth, adminOwner, deleteUser)

// admin
usersRouter.put("/:id/role", isAuth, isAdmin, updateRole)

module.exports = usersRouter