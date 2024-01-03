const User = require("../models/user.model");

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    try {
        await newUser.save();
        res.status(201).json("User created successfully!");
    }
    catch(err) {
        res.status(500).json(err.message);
    }
}

module.exports = {
    signup,
}