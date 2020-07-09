const glob = require("glob");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const entries = {};
const isDevelopment = process.env.NODE_ENV === "development";
const rendererDir = "./src/renderer/";

/**
 * レンダラープロセスのJSファイルを1本化せずに複数ファイルとして
 * Bundleを実行するために、ディレクトリ内のファイルを取得して、
 * entriesへ格納
 */
// glob
//   .sync("**/*.+(js|jsx|ts|tsx)", {
//     cwd: rendererDir,
//     ignore: "main.js",
//     // ignore: path.join(__dirname, "src", "main"),
//   })
//   .map(function (file) {
//     entries[file] = path.resolve(rendererDir, file);
//   });

glob.sync(`${rendererDir}/*.{js,jsx,ts,tsx}`).forEach((files) => {
  entries[path.parse(files).base] = files;
});

/**@type import("webpack").Configuration */
const main = {
  // メインプロセス設定
  target: "electron-main",
  mode: isDevelopment ? "development" : "production",
  resolve: {
    extensions: [".js", ".jsx", ".ts", "tsx", ".json"],
  },
  // エントリーファイル
  entry: {
    main: path.join(__dirname, "src", "main"),
  },
  // アウトプット先 ファイル名をmain.jsに設定
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\/(js|jsx)$/,
        enforce: "pre",
        loader: "eslint-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        enforce: "pre",
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: isDevelopment ? "#inline-souce-map" : false,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        extractComments: false,
      }),
    ],
  },
};

/**@type import("webpack").Configuration */
const preload = {
  // preloadファイル設定
  target: "electron-preload",
  mode: isDevelopment ? "development" : "production",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  entry: {
    preload: path.join(__dirname, "src", "preload"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: "pre",
        loader: "eslint-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        enforce: "pre",
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: isDevelopment ? "#inline-souce-map" : false,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        extractComments: false,
      }),
    ],
  },
};

/**@type import("webpack").Configuration */
const renderer = {
  // レンダラープロセス設定
  // セキュリティ対策としてWebを指定する
  target: "web",
  mode: "development",
  resolve: {
    extensions: [".js", "jsx", ".ts", ".tsx", ".json"],
  },
  entry: entries,
  output: {
    path: path.join(__dirname, "dist"),
    filename: "./js/" + "[name]",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: "pre",
        loader: "eslint-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        enforce: "pre",
        loader: "tes-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: isDevelopment ? "#inline-souce-map" : false,
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      chunks: ["index.js"],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        extractComments: false,
      }),
    ],
  },
};

module.exports = [main, preload, renderer];
