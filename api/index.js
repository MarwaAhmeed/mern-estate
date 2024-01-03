const expres = require("express");
const mongoose = require("mongoose");
const app = expres();
require("dotenv").config();
const URL = process.env.MONGO||"";
const userRouter = require("./routes/user.route");
const authRouter=require("./routes/auth.route")

app.use(expres.json());
app.use('/api/auth',authRouter)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server err";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,      
    })
})
mongoose.connect(URL).then(() => {
    console.log("Connected to database")
    app.listen(3000, () => {
        console.log("Server is running in port 3000!")
    })
}).catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);

})
