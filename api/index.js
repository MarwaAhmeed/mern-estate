const expres = require("express");
const mongoose = require("mongoose");
const app = expres();
require("dotenv").config();
const URL = process.env.MONGO||"";

mongoose.connect(URL).then(() => {
    console.log("Connected to database")
    app.listen(3000, () => {
        console.log("Server is running in port 3000!")
    })
}).catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);

})
