const dotenv = require('dotenv'); // Using dotenv to get our mongodb uri
dotenv.config();

module.exports = {
  url: process.env.MONGODB_URI, // We need to export the uri for mongoose connection
};
