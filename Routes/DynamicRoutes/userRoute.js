const express = require("express");
const router = express.Router();
const { handleCreateUser, handleGetUser } = require("../../Controllers/DynamicController/userAuthController")


// route 2 create user by using post on http://localhost:8000/user/signUp 
router.post("/signUp", handleCreateUser,)
// route 2 get user by using get on http://localhost:8000/user/login 
router.post("/login",handleGetUser)

 module.exports= router;
