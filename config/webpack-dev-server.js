const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const paths = require("./paths");
const config = require("./webpack-dev-config.js");

const Port = 5000;
const Host = "localhost";

const options = {
  host: Host,
  hot: true, // Hot module replacement
  overlay: {
    warnings: false,
    errors: true
  },
  proxy: {
    '/products': {
      target: "http://localhost:3000",
      secure: false,
      changeOrigin: true
    }
  },
  historyApiFallback: true,
  quiet: false,
  noInfo: true,
  contentBase: paths.appAssets, // Where are the static files?
  watchContentBase: true, // Reload page if static content changes
  after() {
    process.stdout.write(`dev server is running: http://${Host}:${Port}\n`);
  }
};

WebpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, options);

server.listen(Port, Host, () => {});