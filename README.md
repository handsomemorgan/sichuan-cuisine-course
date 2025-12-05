# 高端川菜教学网站 (High-end Sichuan Cuisine Course)

这是一个面向国内用户的高端川菜教学网站，致力于通过极致的视觉体验和详细的教学步骤，传承和推广正宗川菜文化。

## 项目特色

- **高端视觉设计**：采用黑金配色，结合 GSAP 动画，打造沉浸式浏览体验。
- **详细烹饪步骤**：图文并茂，严格匹配的步骤拆解，让小白也能轻松上手。
- **静态架构**：基于 Vue 3 (ESM) + Tailwind CSS 开发，无需复杂的后端构建，适合国内环境快速部署。
- **响应式布局**：完美适配桌面端和移动端设备。

## 技术栈

- **核心框架**: Vue.js 3 (ESM build)
- **样式库**: Tailwind CSS (通过 CDN 引入)
- **动画库**: GSAP (GreenSock Animation Platform)
- **图标**: FontAwesome
- **字体**: Noto Serif SC (思源宋体)

## 目录结构

```
.
├── web/
│   ├── assets/          # 静态资源 (图片等)
│   ├── js/
│   │   ├── app.js       # Vue 应用主逻辑
│   │   └── data.js      # 菜谱数据源
│   └── index.html       # 主页
├── parse_steps.py       # 辅助工具：用于抓取和解析菜谱步骤
└── README.md            # 项目文档
```

## 本地运行

1. 确保已安装 Python 3。
2. 在项目根目录下运行：
   ```bash
   python3 -m http.server 8000
   ```
3. 浏览器访问 `http://localhost:8000/web/`

## 部署

本项目为纯静态网站，可以直接部署到 GitHub Pages、Vercel、Netlify 或任何静态文件服务器。

## 作者

[Handsome Morgan](https://github.com/handsomemorgan)
