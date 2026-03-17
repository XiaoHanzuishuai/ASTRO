/*!
 * Live2D Widget CDN 兼容版
 */
(function() {
  // 本地模型路径（你的模型在 /live2d-widget/model/xch001_01/）
  const modelPath = "/live2d-widget/model/";
  const modelName = "xch001_01";

  // 加载 CDN 版本的所有脚本和样式
  function loadResource(url, type, callback) {
    let elem;
    if (type === "css") {
      elem = document.createElement("link");
      elem.rel = "stylesheet";
      elem.href = url;
    } else if (type === "js") {
      elem = document.createElement("script");
      elem.src = url;
    }
    elem.onload = callback;
    document.head.appendChild(elem);
  }

  // 先加载样式，再加载脚本，最后初始化
  loadResource(
    "https://fastly.jsdelivr.net/npm/live2d-widgets@1.0.0-rc.6/dist/waifu.css",
    "css",
    function() {
      loadResource(
        "https://fastly.jsdelivr.net/npm/live2d-widgets@1.0.0-rc.6/dist/live2d.min.js",
        "js",
        function() {
          loadResource(
            "https://fastly.jsdelivr.net/npm/live2d-widgets@1.0.0-rc.6/dist/waifu-tips.js",
            "js",
            function() {
              // 初始化看板娘，指向本地模型
              window.initWidget({
                waifuPath: "https://fastly.jsdelivr.net/npm/live2d-widgets@1.0.0-rc.6/dist/waifu-tips.json",
                modelPath: modelPath,
                defaultModel: modelName,
                cubism2Path: "/live2d-widget/live2d.min.js",
                cubism5Path: "https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js",
                tools: ["hitokoto", "switch-model", "photo", "quit"],
                drag: true,
                logLevel: "error"
              });
            }
          );
        }
      );
    }
  );
})();
