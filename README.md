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

## .prettierrc
// "semi": false, // 句末不使用分号
// "tabWidth": 2, // 缩进字符数
// "useTabs": false, // 使用空格代替tab缩进
// "printWidth": 120, // 超过最大值换行
// "singleQuote": true, // 使用单引号替换双引号
// "bracketSpacing": true, // 在对象中括号内添加空格
// "quoteProps": "as-needed", // 对象属性名是否要加引号
// "jsxSingleQuote": true, // jsx中使用单引号代替双引号
// "jsxBracketSameLine": true, // jsx中> 置于同一行
// "proseWrap": "preserve", // 是否需要换行
// "trailingComma": "none", // 在对象或数组最后一个元素后面是否加逗号
// "arrowParens": "avoid" // 箭头函数参数只有一个时是否要有小括号 avoid: 省略括号