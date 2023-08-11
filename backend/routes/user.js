const express = require("express")
const requireAuth = require("../middleware/requireAuth")

const { signupUser,loginUser ,forgotpassword }= require("../controllers/userController")
const router=express.Router();

router.post("/login",loginUser)

router.post("/signup",signupUser)

// require auth 
router.use(requireAuth)

// Forgot Password route
router.put("/forgotpassword", forgotpassword);

module.exports = router