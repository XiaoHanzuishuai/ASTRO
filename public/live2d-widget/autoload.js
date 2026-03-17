/*!
 * Live2D Widget
 * https://github.com/stevenjoezhang/live2d-widget
 */

// 指向 Cloudflare 部署后的本地根路径（适配你的 live2d-widget 文件夹）
const live2d_path = "/live2d-widget/";

// 封装异步加载资源的方法（无需修改）
function loadExternalResource(url, type) {
  return new Promise((resolve, reject) => {
    let tag;

    if (type === 'css') {
      tag = document.createElement('link');
      tag.rel = 'stylesheet';
      tag.href = url;
    }
    else if (type === 'js') {
      tag = document.createElement('script');
      tag.type = 'module';
      tag.src = url;
    }
    if (tag) {
      tag.onload = () => resolve(url);
      tag.onerror = () => reject(url);
      document.head.appendChild(tag);
    }
  });
}

(async () => {
  // 保留移动端加载（如需关闭，取消下面注释）
  // if (screen.width < 768) return;

  // 避免图片跨域问题（无需修改）
  const OriginalImage = window.Image;
  window.Image = function(...args) {
    const img = new OriginalImage(...args);
    img.crossOrigin = "anonymous";
    return img;
  };
  window.Image.prototype = OriginalImage.prototype;

  // 加载本地样式和提示脚本
  await Promise.all([
    loadExternalResource(live2d_path + 'waifu.css', 'css'),
    loadExternalResource(live2d_path + 'waifu-tips.js', 'js')
  ]);

  // 核心配置：适配你的 model/xch001_01 模型路径
  initWidget({
    waifuPath: live2d_path + 'waifu-tips.json',
    cubism2Path: live2d_path + 'live2d.min.js',
    cubism5Path: 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js',
    // 关键：指向你的 model 目录 + 模型文件夹名
    modelPath: live2d_path + 'model/', // 对应 public/live2d-widget/model/
    defaultModel: 'xch001_01', // 对应 model 下的 xch001_01 文件夹
    // 工具栏配置（保留常用功能）
    tools: ['hitokoto', 'switch-model', 'switch-texture', 'photo', 'info', 'quit'],
    logLevel: 'warn',
    drag: true, // 允许拖动看板娘
    // 额外配置：解决跨域/加载问题
    loadTimeout: 10000, // 延长加载超时时间
    debug: false // 关闭调试模式（减少报错干扰）
  });
})();

console.log(`\n%cLive2D%cWidget%c\n`, 'padding: 8px; background: #cd3e45; font-weight: bold; font-size: large; color: white;', 'padding: 8px; background: #ff5450; font-size: large; color: #eee;', '');
