const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const baseConfig = require("./webpack.base.config");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");

module.exports = merge(baseConfig, {
  entry: "./src/entry-server.js",
  // 让 webpack 以 Node 方式处理模块加载
  // 告知 vue-loader 输出面向服务器代码
  target: "node",
  output: {
    filename: "server-bundle.js",
    // 告知 server bundle 使用 Node 风格导出模块
    libraryTarget: "commonjs2",
  },
  // 不打包 node_modules 第三方包，而是保留 require 方式直接加载
  externals: [
    nodeExternals({
      // 白名单中的资源依然正常打包
      allowlist: [/\.css$/],
    }),
  ],
  plugins: [
    // 这是将服务器的整个输出构建为单个 JSON 文件的插件
    // 默认文件名为 'vue-ssr-server-bundle.json'
    new VueSSRServerPlugin(),
  ],
});
