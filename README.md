## 介绍



这是作为 [wmc-components](https://github.com/wmc-cache/wmc-components)的使用和实现原理的介绍文档，wmc-components是个人对Vue3+ts项目学习和代码重用的开源项目，欢迎大家学习指正和star。



## 安装
```
npm i wmc-components

```

## 全局引入
```  ts
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)//根据APP组件创建单页应用

import wmcComponents from "wmc-components"
import "wmc-components/dist/bundle.css"

app.use(wmcComponents)

```

## 按需引用（推荐）
``` ts
import { WTokenImg,WInput,WForm } from "wmc-components";
