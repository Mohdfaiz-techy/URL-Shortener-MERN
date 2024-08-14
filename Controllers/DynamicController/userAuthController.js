const USER = require("../../Models/userAuth")
const { setUser } = require("../../Services/auth");
const handleCreateUser =async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    console.log(email)
    const user = USER.findOne({email:email})
    console.log(user.email)
    if(!user){
      console.log({message:"the user is already exists"})
      return  res.render("signUp", { error: "the Account is  exists" });
    }
    console.log(user)
    const userCreate = new USER({
      name: name,
      email: email,
      password: password,
      role: role,
    });
    console.log(userCreate)
   await userCreate.save();

    res.render("login");
  } catch (error) {
    console.log(error);
  }
};
const handleGetUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const getUser = await USER.findOne({email:email});
    console.log(getUser);
    if (!getUser || password !== getUser.password) {
      return res.render("login", { error: "Unauthorized access" });
    }

    const token = setUser(getUser);

    // Set token in cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // Enable for HTTPS
        sameSite: "strict", // Recommended for security
      })
      .redirect("/");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error"); // Handle error response appropriately
  }
};
module.exports = {
  handleCreateUser,
  handleGetUser,
};
