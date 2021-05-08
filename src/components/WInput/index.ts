import { App } from 'vue'
import WInput from './WInput.vue'
WInput.install = (app: App) => {
  app.component(WInput.name, WInput)
}

export default WInput