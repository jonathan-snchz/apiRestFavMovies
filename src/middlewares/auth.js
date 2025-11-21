const User = require("../api/models/User")
const { verifyJwt } = require("../utils/jwt")

const isAuth = async (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "")
    if (!token) return res.status(401).json("Unauthorized")
    try {
        const decoded = verifyJwt(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        next()       
    } catch (error) {
        return res.status(401).json("Unauthorized")
    }
}

const isAdmin = async (req, res, next) => {
    if (req.user.role != "admin") {
        return res.status(401).json("Unauthorized")
    }
    next();
}

const adminOwner = async (req, res, next) => {
    const userId = req.params.id;
    if (req.user.role === "admin" || req.user._id.toString() === userId) {
        return next();
    }
    return res.status(401).json("Unauthorized")
}

module.exports = {
    isAuth,
    isAdmin,
    adminOwner,
}