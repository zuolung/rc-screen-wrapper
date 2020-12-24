let exportPlugin = {};
if (process.env.NODE_ENV === "production") {
  exportPlugin = require("./lib/fullScreen.js");
} else {
  exportPlugin = require("./lib/fullScreen.min.js");
}

module.exports = exportPlugin;