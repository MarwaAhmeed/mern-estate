const User = require("../models/user.model");
const errorHandler = require("../utils/error");
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');


const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    try {
        await newUser.save();
        res.status(201).json("User created successfully!");
    }
    catch (err) {
        next(err)
    }
}

const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validuser = await User.findOne({ email });
        if (!validuser) return next(errorHandler(404, 'User not found!'));
        const validpassword = bcrypt.compareSync(password, validuser.password)
        if (!validpassword) return next(errorHandler(401, 'Wrong credentials!'))
        const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validuser._doc;
        res
            .cookie('access token', token, { httpOnly: true })
            .status(200)
            .json(rest); 
    } catch(err) {
        next(err)
    }

}

module.exports = {
    signup,
    signin
}