const rules = require("./webpack.rules");
const webpack = require("webpack");
rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

module.exports = {
  plugins: [new webpack.ExternalsPlugin("commonjs", ["electron"])],
  module: {
    rules,
  },
  devtool: "cheap-module-source-map",
  resolve: {
    fallback: {
      fs: false,
      path: false,
    },
  },
};
