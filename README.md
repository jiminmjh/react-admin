## 项目启动

1. 使用17以上node版本 （nvm alias default 18）
  - "error when starting dev server:
ReferenceError: structuredClone is not defined" 表示node版本过低，请升级node版本
2. 安装依赖包 pnpm install
3. 启动项目 pnpm run dev


## 生产开发环境切换运行醒目
1. env.development 和 .env.production 文件创建
2. vite --mode development ｜ vite --mode production （package.json）
3. npm run build && npm run preview (package.json)