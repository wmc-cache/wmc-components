import { App } from 'vue'
import WTextOverFlow from './WTextOverFlow.vue'
WTextOverFlow.install = (app: App) => {
  app.component(WTextOverFlow.name, WTextOverFlow)
}


export default WTextOverFlow