/* eslints disable  */
import { App } from 'vue'
export {
  RulesProp
} from './defaultProps'

import WInput from './components/WInput'
import WForm from './components/WForm'


const components = [
  WForm,
  WInput
]


const install = (app: App) => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export {
  WInput,
  WForm,
  install
}
export default {
  install
}