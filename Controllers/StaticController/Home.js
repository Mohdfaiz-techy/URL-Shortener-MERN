const URL = require("../../Models/url");

const handleURLRenderForAdmin = async (req, res) => {
  console.log(req.user._id);
  const allURLs = await URL.find({});
  console.log({ allURLs });

  return res.render("Home", {
    allURLs: allURLs,
  });
};
const handleURLRender = async (req, res) => {
  const allURLs = await URL.find({ createdby: req.user._id });
  return res.render("Home", {
    allURLs: allURLs,
  });
};

const handleUserRender = async (req, res) => {
  return res.render("signUp");
};
const handleUserLoginRender = async (req, res) => {
  return res.render("login");
};
const handleUserTestRender = async (req, res) => {
  return res.render("navbar");
};
const handleGetURL = async (req, res) => {
  const shortId = req.params.shortId;
  console.log(shortId);
  try {
    const result = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visilHistory: { timestamps: Date.now() },
        },
      }
    );
  console.log(result.reDirectURL)
    res.redirect(result.reDirectURL);
  } catch (error) {
    console.log({error})
  }
 
};
module.exports = {
  handleURLRenderForAdmin,
  handleURLRender,
  handleUserRender,
  handleUserLoginRender,
  handleUserTestRender,
  handleGetURL
};
