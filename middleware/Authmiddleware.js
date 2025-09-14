const jwt = require("jsonwebtoken");
const User = require("../model/User");
const express = require("express")

const protect = async(req,res,next)=>{
    
    let token;

    token = req.cookies.token;

    if(token){
      
        try {
            const decoded = jwt.verify(token,process.env.SECRET_KEY);
            console.log(decoded);
            const lolo = await User.findById(decoded.userId).select('-password')
            console.log(lolo)
            req.user = lolo;
            next()
        } catch (error) {
            res.status(404).json({
                message:`Not authorized, token failed`
            })
        }
    }else{
    res.status(401);
    throw new Error('Not authorized, no token');
  }
}



module.exports = protect