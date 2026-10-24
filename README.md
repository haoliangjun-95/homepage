# 皓亮君的个人主页

基于纯 HTML、CSS 和 JavaScript 构建的配置驱动个人主页/导航页（基于开源项目 [Zyyo](https://zyyo.net) 二次开发）。

## 功能特性

- **配置驱动**：所有内容通过 `config.json` 加载，无需修改代码
- **个人资料展示**：头像、姓名、角色、座右铭、位置、组织、标签
- **时间线**：个人历程/事件记录
- **社交链接**：GitHub、邮箱、微信（二维码弹窗）等
- **网站与项目展示**：卡片式网格布局，支持悬停动效
- **明暗主题切换**：亮色/暗色切换，Cookie 持久化（365天），首次访问跟随系统偏好
- **响应式设计**：适配桌面端和移动端
- **加载动画**：页面加载时缩放动画
- **贪吃蛇动画**：根据主题切换的 SVG 装饰
- **自定义字体**：英文字体（Ubuntu）、标题字体（Pacifico），woff2 子集化
- **图片弹窗**：点击查看大图（如二维码）
- **网站统计**：集成 51.la 统计
- **SEO 基础**：语义化标题层级、Open Graph 标签、canonical、robots.txt、sitemap.xml、404 页面
- **控制台彩蛋**：开发者工具中显示自定义版权信息与 ASCII 猫
- **ICP 备案**：页脚 ICP 备案信息
- **毛玻璃效果**：卡片背景模糊的玻璃态设计

## 使用方法

1. 编辑 `config.json` 配置个人资料、链接、项目等
2. 替换 `static/img/` 中的图片资源
3. 部署到任意静态托管服务

## Nginx 部署

1. 将项目文件上传到服务器（如 `/var/www/homepage`）
2. 配置 Nginx 站点：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /www/wwwroot/homepage;
    index index.html;

    error_page 404 /404.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 文本资源压缩（SVG 动画体积大，gzip 效果显著）
    gzip on;
    gzip_types text/css application/javascript image/svg+xml application/json;
    gzip_min_length 1k;

    # 静态资源缓存
    location ~* \.(jpg|jpeg|png|gif|webp|ico|svg|css|js|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

3. 检查配置并重载 Nginx：

```bash
nginx -t
systemctl reload nginx
```

## 项目结构

```
├── index.html            # 主页面
├── config.json           # 站点配置文件
├── static/
│   ├── css/
│   │   ├── style.css     # 主样式 + 响应式
│   │   └── root.css      # CSS 变量（主题）
│   ├── js/
│   │   ├── config-loader.js  # 配置加载 + SVG 图标
│   │   └── script.js         # 页面渲染 + 交互逻辑
│   ├── img/              # 图片资源（头像、背景等）
│   ├── fonts/            # 自定义字体
│   └── svg/              # 主题贪吃蛇 SVG
└── README.md
```
