//configuring the dotenv file
require("dotenv").config()

// ImportingAll Packages
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

//Middleware
app.use(express)
app.use(cors)

//listening on a port
app.listen(process.env.PORT , () => {
    console.log(`Listening Node Server on port {port}`)
})
