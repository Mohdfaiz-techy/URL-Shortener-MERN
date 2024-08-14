const express = require("express")
const router = express.Router();
const {handleURLRenderForAdmin,handleURLRender,handleUserRender,handleUserLoginRender,handleUserTestRender,handleGetURL} = require("../../Controllers/StaticController/Home");
const { restrictTo } = require("../../MiddleWares/auth");
// route 1 //rendering on frontEnd using EJS http://localhost:8000/admin/urls
router.get("/admin/urls",restrictTo(["admin"]) ,handleURLRenderForAdmin)

// route 2 //rendering on frontEnd using EJS http://localhost:8000/
router.get("/",restrictTo(['normal','admin']) ,handleURLRender)

// route 3 //using get for getting url http://localhost:8000/:shortId
router.get("/:shortId",handleGetURL)
// route 4 //rendering on frontEnd using EJS http://localhost:8000/user
router.get("/user/signUp",handleUserRender)

// route 5 //rendering on frontEnd using EJS http://localhost:8000/user
router.get("/user/login",handleUserLoginRender)



// route 6 // test and rendering on frontEnd using EJS http://localhost:8000/user/test
router.get("/user/test",handleUserTestRender)
module.exports = router;