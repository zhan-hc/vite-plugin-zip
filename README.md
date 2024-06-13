# vite-plugin-build-zip

这是一个可以自动压缩打包之后的dist文件的插件

## 安装
```js
npm i vite-plugin-build-zip -D
yarn add vite-plugin-build-zip -D
```

## zipBuildPlugin

**zipBuildPlugin({ outputPath, zipName})**

`outputPath` 代表打包输出的路径，默认值为build.outDir值，一般为dist
`zipName` 压缩的名称 默认为package.json的name值

## 使用方法

```js
import zipBuildPlugin from 'vite-plugin-build-zip'

// vite.config.ts | vite.confing.js

export default defineConfig({
  plugins: [
    zipBuildPlugin()
  ]
})

```
