# Sub2API 社区介绍站

Sub2API 开源项目的中文社区介绍与使用入口导航。本网站为非官方站点，内容整理自公开开源资料；源码、许可证、更新和安全说明请以 [Wei-Shaw/sub2api](https://github.com/Wei-Shaw/sub2api) 为准。

## 本地开发

需要 Node.js 22 或更新版本（Wrangler 4 的运行要求）。

```bash
npm install
npm run dev
```

## Cloudflare Pages 部署

```bash
cp .env.example .env
npm run deploy
```

`.env` 配置 `CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID` 和 `CLOUDFLARE_PAGES_PROJECT_NAME`，文件已加入 Git 忽略。Wrangler 4 需要 Node.js 22 或更新版本。首次部署前创建 Pages 项目：

```bash
npx wrangler pages project create sub2api-site --production-branch main
```

## Modb API 入口

站点在导航、首屏服务区和页脚提供 Modb API 镜像站与中转站入口：

- 镜像站：https://aqqq.shop/
- 中转站：https://modbapi.com/
