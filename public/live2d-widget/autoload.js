/*!
 * Live2D Widget 兼容 Astro 版本
 */
(function() {
  // 本地模型路径（适配你的 public/live2d-widget/model/）
  const live2d_path = "/live2d-widget/";
  const model_name = "xch001_01";

  // 加载核心样式
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = live2d_path + 'waifu.css';
  document.head.appendChild(link);

  // 加载 Live2D 核心 SDK 和看板娘脚本（用 CDN 避免兼容问题）
  function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    document.body.appendChild(script);
  }

  // 先加载 Live2D 核心，再初始化看板娘
  loadScript('https://fastly.jsdelivr.net/npm/live2d-widgets@1.0.0-rc.6/dist/live2d.min.js', function() {
    loadScript('https://fastly.jsdelivr.net/npm/live2d-widgets@1.0.0-rc.6/dist/waifu-tips.js', function() {
      // 初始化看板娘，指向本地模型
      window.initWidget({
        waifuPath: live2d_path + 'waifu-tips.json',
        modelPath: live2d_path + 'model/',
        defaultModel: model_name,
        cubism2Path: live2d_path + 'live2d.min.js',
        cubism5Path: 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js',
        tools: ['hitokoto', 'switch-model', 'photo', 'quit'],
        drag: true,
        logLevel: 'error'
      });
    });
  });
})();
