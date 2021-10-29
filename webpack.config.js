/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const buildPath = path.resolve(__dirname, "build");

const typescriptAndBabelLoaders = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: [{ loader: "babel-loader", options: { cacheDirectory: true } }],
};

const sassLoader = {
  test: /\.s[ac]ss$/i,
  exclude: /node_modules/,
  use: [
    {
      loader: "style-loader",
    },
    {
      loader: "css-loader",
    },
    {
      loader: "sass-loader",
    },
  ],
};

const fontsLoader = {
  test: /\.woff2?$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
        outputPath: "fonts/",
      },
    },
  ],
};

const imagesLoader = {
  test: [/\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].[hash:8].[ext]",
        outputPath: "images/",
      },
    },
  ],
};

const videosLoader = {
  test: [/\.mp4$/, /\.mov$/, /\.vtt$/],
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].[hash:8].[ext]",
        outputPath: "videos/",
      },
    },
  ],
};

const pdfsLoader = {
  test: /\.pdf$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].[hash:8].[ext]",
        outputPath: "pdfs/",
      },
    },
  ],
};

const alias = {
  _app: path.resolve("./", "src", "app"),
  _assets: path.resolve("./", "src", "assets"),
  _components: path.resolve("./", "src", "components"),
  _services: path.resolve("./", "src", "services"),
  _adapters: path.resolve("./", "src", "adapters"),
  _constants: path.resolve("./", "src", "constants"),
  _context: path.resolve("./", "src", "context"),
  _interfaces: path.resolve("./", "src", "interfaces"),
  _utils: path.resolve("./", "src", "utils"),
  _context: path.resolve("./", "src", "context"),
  "react-dom": "@hot-loader/react-dom",
};

const htmlWebPackPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html",
});

const cleanWebPackPlugin = new CleanWebpackPlugin();
const forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin();

const devServer = {
  static: {
    directory: path.join(__dirname, "public"),
    watch: { usePolling: true, ignored: "node_modules/**" },
  },
  compress: true,
  port: 4000,
  historyApiFallback: true,
  open: true,
  host: "localhost",
};

module.exports = (env) => {
  const isProduction = env.NODE_ENV === "production";
  const transpilerLoader = typescriptAndBabelLoaders;

  return {
    output: {
      filename: "main-[chunkhash].js",
      path: buildPath,
      publicPath: "/",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias,
    },
    module: {
      rules: [
        transpilerLoader,
        sassLoader,
        fontsLoader,
        imagesLoader,
        videosLoader,
        pdfsLoader,
      ],
    },
    plugins: [
      forkTsCheckerWebpackPlugin,
      cleanWebPackPlugin,
      htmlWebPackPlugin,
    ],
    devServer,
    devtool: !isProduction ? "eval-cheap-module-source-map" : undefined, //eval-source-map
  };
};
