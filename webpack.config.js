const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";

/**エディタ補完を機能させるために方定義ファイルをインポート */
/**@type import("webpack").Configuration */
const main = {
  // メインプロセス設定
  target: "electron-main",
  mode: isDevelopment ? "development" : "production",
  resolve: {
    extensions: [".js", ".ts", ".json"],
  },
  // エントリファイル
  entry: {
    main: path.join(__dirname, "src", "main"), // "./src/main.ts",
  },
  // バンドル済みファイル保存場所
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    /**
     * .js拡張子のファイルはeslint-loaderで処理
     * .ts拡張子のファイルはts-loaderで処理
     * node_modulesは対象外
     */
    rules: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  // developmentモードではソースマップをつける
  devtool: isDevelopment ? "#inline-source-map" : false,
};

/**@type import("webpack").Configuration */
const preload = {
  // preloadファイル設定用
  target: "electron-preload",
  mode: isDevelopment ? "development" : "production",
  resolve: {
    extensions: [".js", ".ts", ".json"],
  },
  entry: {
    preload: path.join(__dirname, "src", "preload"), //"./src/preload.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devtool: isDevelopment ? "#inline-source-map" : false,
};

/**レンダラープロセス設定 */
/**@type import("webpack").Configuration */
const renderer = {
  // セキュリティ対策として "Web"を指定
  // erectron-rendererはNG
  target: "web",
  mode: isDevelopment ? "development" : "production",
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  entry: {
    renderer: "./src/renderer.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    /**
     * バンドル済みJSファイルを<script>タグつぉいて差し込んだ
     * HTMLファイルを出力する
     */
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  /**
   * developmentモードはソースマップをつけないと
   * Electronのでボロっパーコンソールに
   * 'Uncaught EventError'が表示されるので注意する
   */
  devtool: isDevelopment ? "#inline-source-map" : false,
};

module.exports = [main, preload, renderer];
