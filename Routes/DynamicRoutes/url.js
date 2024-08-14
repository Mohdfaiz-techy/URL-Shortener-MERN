const express = require("express")
const router = express.Router();
const {handleGenerateNewURL,handleGetURL,handleAnalyicsURL} = require('../../Controllers/DynamicController/url')
// route 1 //using post for getting Shortid http://localhost:8000/url
router.post("/",handleGenerateNewURL)
// route 2 //using get for getting Analytics of urls http://localhost:8000/url/analyics/:shortId
router.get("/analyics/:shortId",handleAnalyicsURL)
module.exports = router;