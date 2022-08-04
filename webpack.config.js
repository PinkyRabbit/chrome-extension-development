const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/toolbar/popup.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/toolbar"),
  },
  mode: "production",
  devtool: "hidden-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/toolbar/popup.ejs",
    }),
  ],
};
