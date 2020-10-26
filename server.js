const express = require("express");
const fs = require("fs");
const { createBundleRenderer } = require("vue-server-renderer");
const setupDevServer = require("./build/setup-dev-server");

const isProd = process.env.NODE_ENV === "production";
const server = express();

let renderer;
let onReady;

if (isProd) {
  const serverBundle = require("./dist/vue-ssr-server-bundle.json");
  const clientManifest = require("./dist/vue-ssr-client-manifest.json");
  const template = fs.readFileSync("./index.template.html", "utf-8");
  renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest,
  });
} else {
  // 开发模式 -> 监听打包构建 -> 重新生成 Renderer 渲染器
  onReady = setupDevServer(server, (serverBundle, template, clientManifest) => {
    renderer = createBundleRenderer(serverBundle, {
      template,
      clientManifest,
    });
  });
}

// express.static 处理的是物理磁盘中的资源文件
server.use("/dist", express.static("./dist"));

const render = async (req, res) => {
  try {
    const html = await renderer.renderToString({
      title: "哈哈哈",
      meta: `<meta name="description" content="茂茂">`,
      url: req.url,
    });
    res.setHeader("Content-Type", "text/html; charset=utf8");
    res.end(html);
  } catch (err) {
    console.log(err);
    res.status(500).end("Internal Server Error.");
  }
};

server.get(
  "*",
  isProd
    ? render
    : async (req, res) => {
        // 等待有了 Renderer 渲染器以后，调用 render 进行渲染
        await onReady;
        render(req, res);
      }
);

server.listen(3000);
