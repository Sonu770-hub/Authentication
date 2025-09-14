const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended :true}))
app.use(cookieParser());
const ConnectDB = require("./config/db")
const User = require("./model/User")
const moment = require("moment-timezone")
const jwt = require("jsonwebtoken")
const generateToken = require("./utils/generateToken")
const bcrypt = require("bcrypt")
const router = require("./route/UserRoutes")

ConnectDB()


app.use('/api/user',router)


// Register ROute
// @desc    Auth user & get token
// @route   POST /api/users/register
// @access  Public



//Login :






app.listen(process.env.PORT,()=>{
    console.log("App is running at the port : 3000")
})




