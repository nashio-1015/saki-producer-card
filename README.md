# Saki Producer Card

花海咲季主题的移动优先 Producer 数字名片。React、TypeScript、Vite、Tailwind CSS、Motion for React 与 Lucide React 构建。当前视觉素材只使用几何图形和占位框，不含未经授权的角色图片。背景音乐为项目提供的 MP3，由用户点击后通过原生 `HTMLAudioElement` 播放。

## 本地运行

需要 Node.js 20 或更新版本。首次安装依赖并启动开发服务器：

```bash
npm install
npm run dev
```

执行生产构建并本地预览：

```bash
npm run build
npm run preview
```

目前仓库配置了 `build`，没有单独的 lint/test 脚本。类型检查包含在 `npm run build` 的 `tsc -b` 步骤中。

## 更新个人信息

编辑 `src/config/profile.ts`：

- `producerName`：Producer 名称。
- `introductionZh`、`introductionJa`：中日文简介。
- `mainIdol`、`favoriteSong`：担当偶像和喜欢的歌曲。
- `socialLinks`：平台名称、账号 ID、主页 URL、显示开关和顺序。
- `avatarPath`、`characterImagePath`：头像和立绘的公开资源路径。

新增链接需填写完整 `https://` 地址。网站只允许 HTTP/HTTPS 协议；空链接或无效链接会显示不可跳转的占位状态。隐藏平台设 `visible: false`，修改 `order` 可调整顺序。外部链接会在新标签页打开，并使用 `rel="noopener noreferrer"`。

## 更新立绘

将已获授权的透明 WebP/AVIF/PNG 文件放入 `public/images/`，建议移动端主图控制在约 500 KB 内；导出前保留完整头部和脸部，避免过度裁切。然后在 `src/config/profile.ts` 更新 `characterImagePath`（例如 `/images/saki.webp`）。图片尺寸与布局应在手机宽度下重新检查。本项目当前没有实际角色立绘，仍显示占位区域。

## 更新背景音乐

编辑 `src/config/music.ts` 的 `title`、`artist`、`src`、`pauseWhenHidden`、`startMuted` 和 `initialVolume`。音频文件放在 `public/audio/`，并使用以 `/audio/` 开头的路径。播放器不自动播放；必须由访客点击播放。页面不可见时默认暂停，回到页面后不会自动续播。音量由用户控制。

## 修改其他网站文字

导航、Hero、Profile、社交区、NOW PLAYING 和 Footer 的结构与静态文案位于 `src/components/`。主题色、字体和布局 CSS 位于 `src/styles/global.css`，全局设计常量位于 `src/config/theme.ts`。`src/App.tsx` 管理中日文切换。

## Vercel 部署

仓库含 `vercel.json`：使用 Vite 框架、`npm run build`、输出目录 `dist`，并为 SPA 设置回退规则。部署方式：

1. 将项目提交到 GitHub、GitLab 或 Bitbucket 仓库。
2. 登录 Vercel，选择 **Add New → Project** 并导入仓库。
3. 确认 Framework Preset 为 Vite、Build Command 为 `npm run build`、Output Directory 为 `dist`。一般无需环境变量。
4. 点击 Deploy，等待构建结束。
5. 部署成功后，使用 Vercel 提供的 `*.vercel.app` 公共 URL。无需先购买或绑定自定义域名；绑定域名是可选项。
6. 访问首页与 `/audio/bgm.mp3`，检查页面、SNS、音频及手机布局后，再把最终 HTTPS URL 用于印刷二维码。

尚未在 Vercel 部署。本地完成构建或部署成功前，不应将网站视为已公开。

## 生成印刷二维码

正式公开 HTTPS URL 确定后再生成，勿用 localhost 或临时预览地址。脚本使用高纠错等级 H，黑色模块、白色背景、默认四模块静区，不加 Logo、渐变或装饰，降低印刷识别风险。

```bash
python -m pip install "qrcode[pil]"
python scripts/generate_qr.py https://your-final-site.vercel.app
```

输出位于 `outputs/qr/producer-card-qr.svg` 和 `outputs/qr/producer-card-qr.png`。PNG 为 2400 × 2400 px、600 DPI。印刷时保持正方形、黑白反差与静区，不要压缩、反色、覆盖中心或缩放到过小尺寸。

### 印刷前扫描检查

- 用 iOS 相机和 Android 相机分别扫描 SVG/PNG 打样。
- 在实际名片纸材、尺寸、覆膜和印刷浓度下扫描。
- 手机距离名片约 15–30 cm，检查不同光线和角度。
- 确认扫描结果为最终 HTTPS 域名，并能正常打开网站。
- 检查二维码四周保留完整白色静区，无裁切、污点、文字或 Logo 覆盖。
- 至少用两台不同型号设备各重复扫描数次；无法一次识别时增大二维码或改善印刷对比度。


## 项目结构

组件按页面区域拆分在 src/components/，共享的 HTMLAudioElement 播放器位于 src/hooks/useAudioPlayer.tsx，profile 与 music 配置位于 src/config/。public/audio/bgm.mp3 是当前 BGM；public/assets/favicon.svg 为网站图标。角色图片目录预留在 public/assets/，需添加真实授权素材后再填写 profile 路径。


