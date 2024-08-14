const express = require("express");
const app = express();
const { connectToMongo } = require("./connectToMongo");
const PORT = 8000;
const staticRouteHome = require("./Routes/StaticRoutes/Home");
const dynamicURLRoute = require("./Routes/DynamicRoutes/url");
const dynamicUserRoute = require("./Routes/DynamicRoutes/userRoute");
const cookieParser = require("cookie-parser");
const {
  checkUserForAuthentication,
  restrictTo,
} = require("./MiddleWares/auth");
require("dotenv").config()
console.log(process.env.DB_NAME)
connectToMongo(`mongodb://localhost:27017/${process.env.DB_NAME}`)
  .then(() => {
    console.log("connect to mongo Successfully!");
  })

  .catch((error) => {
    console.log("error ", error);
  });
//setting view engine to ejs
app.set("view engine", "ejs");
// The express.json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

// The express.urlencoded() function is a built-in middleware function in Express. It parses incoming requests with URL-encoded payloads and is based on a body parser.
app.use(express.urlencoded({ extended: false }));

// when we deal with cookies we need to parse cookies by cookieParser
app.use(cookieParser());

app.use(checkUserForAuthentication);
app.use("/", staticRouteHome);
app.use("/url", restrictTo(["normal", "admin"]), dynamicURLRoute);
app.use("/user", dynamicUserRoute);

app.listen(PORT, () => {
  console.log(`App listen on this PORT: ${PORT}`);
});
