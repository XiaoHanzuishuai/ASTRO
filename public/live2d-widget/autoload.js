/*!
 * Live2D Widget
 * https://github.com/stevenjoezhang/live2d-widget
 */

// 关键修改：指向 Cloudflare 部署后的本地路径（适配你的文件夹名）
const live2d_path = "/live2d-widget/"; // 对应 public/live2d-widget/ 目录

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

  // 避免图片跨域（无需修改）
  const OriginalImage = window.Image;
  window.Image = function(...args) {
    const img = new OriginalImage(...args);
    img.crossOrigin = "anonymous";
    return img;
  };
  window.Image.prototype = OriginalImage.prototype;

  // 加载本地的样式和提示脚本
  await Promise.all([
    loadExternalResource(live2d_path + 'waifu.css', 'css'),
    loadExternalResource(live2d_path + 'waifu-tips.js', 'js')
  ]);

  // 核心配置：加载你自己的模型
  initWidget({
    waifuPath: live2d_path + 'waifu-tips.json', // 本地台词文件
    cubism2Path: live2d_path + 'live2d.min.js', // 本地 Live2D 核心文件
    cubism5Path: 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js', // 公共 CDN
    // 关键：指定你自己的模型路径（替换成你的模型文件夹名，比如 xch001_01）
    modelPath: live2d_path + 'xch001_01/', // 模型文件夹路径
    defaultModel: 'xch001_01', // 模型名称（和文件夹名一致）
    // 工具栏配置（保留常用功能）
    tools: ['hitokoto', 'switch-model', 'switch-texture', 'photo', 'info', 'quit'],
    logLevel: 'warn',
    drag: true, // 允许拖动看板娘
  });
})();

console.log(`\n%cLive2D%cWidget%c\n`, 'padding: 8px; background: #cd3e45; font-weight: bold; font-size: large; color: white;', 'padding: 8px; background: #ff5450; font-size: large; color: #eee;', '');
