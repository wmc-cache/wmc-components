## 介绍

wmc-components 是个人对 Vue3+ts 项目学习和代码重用的开源项目，欢迎大家学习指正和 star。

## 安装

```
npm i wmc-components

```

## 全局引入

```ts
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App) //根据APP组件创建单页应用

import wmcComponents from 'wmc-components'
import 'wmc-components/dist/bundle.css'

app.use(wmcComponents)
```

## 按需引用（推荐）

```ts
import { WTokenImg, WInput, WForm } from 'wmc-components'
```
