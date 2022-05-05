const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpack = require("webpack");

const get_server_url = () => {
  if (process.env.GITPOD_WORKSPACE_URL) {
    return process.env.GITPOD_WORKSPACE_URL.replace("https://", "https://3005-")
  }
  return "http://localhost:3005"
}

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    main: "./src/index.tsx",
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  output: {
    path: `${__dirname}/server/build`,
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.t(s|sx)?$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx",
          target: "es2015",
        },
      },
    ],
  },
  devServer: {
    port: 3000,
    host: "0.0.0.0",
    allowedHosts: 'all',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "chat app",
      template: "./static/index-template.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          name: "vendor",
          chunks: "all",
          test: /node_modules/,
          priority: 20,
        },
      },
    },
  },
};
