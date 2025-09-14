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

ConnectDB()

app.get('/',(req,res)=>{
   res.status(200).json({
    message:"Successfully started the App"
   })
})


// Register ROute
// @desc    Auth user & get token
// @route   POST /api/users/register
// @access  Public
app.post('/register',async (req,res)=>{
    
    const {username,password} = req.body

    const createdAtIST = moment().tz('Asia/Kolkata').toDate();
    
    // first we have to check whether the user pre-exist or not :
    const user = await User.findOne({username : username})

    if(user){
         return res.status(401).json({
            message : `User Already Exist ! Please Login`
        })
    }

    const salt = await bcrypt.genSalt(10)

    // Hash the password and save !! :)
    const hash = await bcrypt.hash(password, salt);


    // if not => create a user
    const result = await  User.create({
        username,
        password:hash
    })



    if(result){
     generateToken(res,result._id)
    }

    res.status(200).json({
        message : `User Successfully Registered!!`
    })

})


//Login :
app.post('/login',async (req,res)=>{
    
    const {username , password} = req.body

    const user = await User.findOne({username})
    
    if(!user){
        return res.status(404).json({
            message: `Please Register first`
        })
    }

  

    const ismatch = await bcrypt.compare(password,user.password)
    
    if(!ismatch){
         return res.status(404).json({
            message: `Invalid userName and password!!`
        })
    }

    generateToken(res,user._id)

    return res.json({
        message :`User Successfully LoggedIn `
    })

})


app.listen(process.env.PORT,()=>{
    console.log("App is running at the port : 3000")
})




