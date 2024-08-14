const { getUser } = require("../Services/auth");

const checkUserForAuthentication = (req,res,next) => {
  try {
    const tokenCokies = req.cookies?.token;
  req.user = null;
  if (!tokenCokies) {
    return next();
  }
  const token = tokenCokies;
  const user = getUser(token);

  req.user = user;
  return next();
  } catch (error) {
    console.log({error})
  }
  
};
const restrictTo = (roles = []) => {
try {
  return (req, res, next) => {
    if (!req.user) {
      return res.redirect('/user/login');
    }

    if (!roles.includes(req.user.role)) {
      return res.end("UnAuthrized");
    }
    return next();
  };
} catch (error) {
  console.log({error});
}

};

module.exports = {
  checkUserForAuthentication,
  restrictTo,
};
