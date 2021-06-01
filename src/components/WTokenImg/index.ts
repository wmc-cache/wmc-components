import { App } from 'vue'
import WTokenImg from './WTokenImg.vue'
WTokenImg.install = (app: App) => {
  app.component(WTokenImg.name, WTokenImg)
}


export default WTokenImg