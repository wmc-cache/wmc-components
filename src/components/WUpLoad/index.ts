import { App } from 'vue'
import WUpLoad from './WUpLoad.vue'
WUpLoad.install = (app: App) => {
  app.component(WUpLoad.name, WUpLoad)
}


export default WUpLoad