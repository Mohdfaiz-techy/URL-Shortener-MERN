const nanoId = require("shortid");
const url = require("../../Models/url");
const handleGenerateNewURL = async (req, res) => {
  const body = req.body;
  try {
    if (!body.url) {
      return res.status(400).json({
        error: "URL is required",
      });
    }
    const shortId = nanoId.generate(8);
    const urlId = new url({
      createdby:req.user._id,
      shortId: shortId,
      reDirectURL: body.url,
      visilHistory: [],
    });
    const result = urlId.save();
    console.log(urlId);
    return res.render("Home",{
      id: shortId,
    });
  } catch (error) {
    console.log({
      error})
  }
 
};

const handleAnalyicsURL = async(req, res) => {
    const shortId = req.params.shortId;
    console.log(shortId);
    try {
      const result = await url.findOne({shortId})
      return res.status(200).json({
           totalClicks:result.visilHistory.length,
           analytics:result.visilHistory
       })
    } catch (error) {
      console.log({error})
    }
  

};
module.exports = {
  handleGenerateNewURL,
  handleAnalyicsURL,
};
