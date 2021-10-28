import path from "path";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { Configuration } from "webpack";
import "webpack-dev-server";

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
  "react-dom": "@hot-loader/react-dom",
};

const config: Configuration = {
  mode: "development",
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias,
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  devServer: {
    static: { directory: path.join(__dirname, "public"), watch: true },
    compress: true,
    port: 4000,
    historyApiFallback: true,
    open: true,
    host: "localhost",
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: "./src/**/*",
      },
    }),
  ],
  devtool: "eval-cheap-module-source-map",
};

export default config;
