const express = require("express");
const { RegisterUser, LoginUser, Testuser, LogoutUser, getUserProfile } = require("../controller/UserController");
const protect = require("../middleware/Authmiddleware");
const router = express.Router();


router.get('/',protect,Testuser)
router.post('/register',RegisterUser)
router.post('/login',LoginUser)
router.get('/logout',LogoutUser)

router.
      route("/profile")
      .get(protect,getUserProfile)

     











module.exports = router