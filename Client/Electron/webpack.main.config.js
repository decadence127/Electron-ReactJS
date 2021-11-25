const path = require("path");
module.exports = {
  entry: "./src/main.js",
  module: {
    rules: require("./webpack.rules"),
  },
  resolve: {
    alias: {
      TransferModel: path.resolve(
        __dirname,
        "./transferModel/transferModel.js"
      ),
    },
  },
};
