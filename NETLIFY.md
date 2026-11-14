# Netlify 免费部署

本项目是纯静态 Vite + React + TypeScript 网站，没有 Vercel Functions、服务端渲染或数据库依赖。构建命令为 `npm run build`，输出目录为 `dist`。仓库保留原有 `vercel.json`；`netlify.toml` 和 `public/_redirects` 只供 Netlify 使用。

## 连接同一个 GitHub 仓库

1. 登录或创建 Netlify 账号，在导入时选择 **Import from Git**，再授权 Netlify 访问 `nashio-1015/saki-producer-card`。授权时只选择这个仓库（如果授权界面支持仓库范围）。
2. 使用 Netlify Free（显示价格为 $0/月）。不要选择付费升级，也不要打开自动充值。Free 每月有 300 credits 的硬上限；达到上限后站点会暂停至下个计费周期，不会自动产生超额费用。上线后在 Usage 页面留意剩余额度。
3. 导入后确认生产分支为 `main`，构建命令为 `npm run build`，发布目录为 `dist`。这些值也写在 `netlify.toml`，通常会自动识别。
4. 点击部署，等待构建成功。先使用 Netlify 提供的 `*.netlify.app` 地址；无需购买域名。不要修改 Vercel 项目、DNS 或自定义域名设置。
5. 这组准备文件目前在 `codex/netlify-free-deploy` 分支。将配置合并到 `main` 后，Netlify 和现有 Vercel 才能都从同一生产分支持续部署。Vercel 配置保持原样。

项目只有单页界面，但包含 `public/_redirects` 将未知路径回退到 `index.html`，避免 Netlify 在直接打开深层链接时返回 404。Netlify 的音频缓存时间为 1 小时，避免更新 `/audio/bgm.mp3` 后被长时间旧缓存遮住。

## 大陆网络验证清单

Netlify 的 Free 全球 CDN 不能保证在中国大陆的每个运营商、地区和网络中都可访问。没有真实大陆网络测试前，不要将备用地址描述为已解决访问问题。部署完成后，在关闭 VPN/代理的条件下，用中国移动、联通、电信网络至少各测试一次（如条件允许，再换不同地区/手机）。

### 连接失败
- 浏览器显示连接超时、TLS/证书错误或拒绝连接：记录网络、时间、设备和完整错误。若多个网络都无法建立连接，优先排查连通性或平台可达性。

### DNS 失败
- 域名无法解析、解析超时或各 DNS 返回异常：记录运营商与 DNS 解析结果。尝试另一运营商网络区分本地 DNS 与站点问题。

### 资源失败
- 首页能打开但样式、图片、脚本或 BGM 失败：检查开发者工具 Network 面板中的请求 URL、状态码、MIME 类型和响应大小。
- 确认关键文件仍来自本域：`/assets/saki-hero.svg`、Vite 输出的 JS/CSS、`/audio/bgm.mp3`。字体使用系统字体栈，不依赖 Google Fonts。
- BGM 在用户播放前应保持延迟加载；播放器按钮、静音、音量、进度及页面隐藏时暂停/返回续播需单独检查。

### 前端运行失败
- 页面 HTML 已返回且资源状态码正常，但内容空白或交互失效：查看 Console 的 JavaScript 异常，再检查 React 挂载、开场遮罩、SNS 和播放器状态。
- 通过页面重新加载、点击各 SNS、手动播放/暂停以及回到页面来复测。
- 对外部 SNS 的可访问性要单独判断；Bilibili、X、小红书或 QQ 的第三方限制不等同于名片网站自身不可用。

记录每台测试设备的运营商、地区、系统/浏览器、时间、首页结果、图片/SNS/BGM 结果和错误信息，再判断 Netlify 地址是否确实改善了这些用户的访问成功率。
