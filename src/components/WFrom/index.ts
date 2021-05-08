import { App } from 'vue'
import WFrom from './WFrom.vue'
WFrom.install = (app: App) => {
  app.component(WFrom.name, WFrom)
}

export default WFrom