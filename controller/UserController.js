const User = require("../model/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");



const Testuser = (req,res)=>{
     res.send("working")
}


const RegisterUser = async(req,res)=>{
    const {username,password} = req.body

    //const createdAtIST = moment().tz('Asia/Kolkata').toDate();
    
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
}


const LoginUser = async(req,res)=>{
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

}

const LogoutUser = (req,res)=>{
   res.cookie('token','',{
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({
    message : "Successfully LoggedOut!"
  })
}

const getUserProfile =async(req,res)=>{
    
    const user = await User.findById(req.user._id);
    
    console.log(user)

    if(user){

        res.json({
            _id: user._id,
            name:user.username
        })

    }else{
        res.status(404).json({
            message:`user not found`
        })
    }
}

module.exports = {
    RegisterUser,
    LoginUser,
    Testuser,
    LogoutUser,
    getUserProfile
}