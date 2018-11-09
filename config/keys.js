module.exports = {
  mongoURI: "mongodb://test:test123@ds143953.mlab.com:43953/calender"
};
if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys_prod");
} else {
  module.exports = require("./keys_dev");
}
