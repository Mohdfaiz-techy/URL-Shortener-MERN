const mongoose = require('mongoose');


async function connectToMongo(URL) {
  return mongoose.connect(URL);
}
module.exports = {connectToMongo}