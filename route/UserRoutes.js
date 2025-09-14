const express = require("express");
const { RegisterUser, LoginUser, Testuser, LogoutUser } = require("../controller/UserController");
const router = express.Router();


router.get('/',Testuser)
router.post('/register',RegisterUser)
router.post('/login',LoginUser)
router.get('/logout',LogoutUser)

     











module.exports = router