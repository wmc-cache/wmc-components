import { App } from 'vue'
import WForm from './WForm.vue'
WForm.install = (app: App) => {
  app.component(WForm.name, WForm)
}

export default WForm