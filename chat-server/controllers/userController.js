const userService = require("../services/userServices")

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (e) {
        next(e);
    }
};

module.exports = { getAllUsers };