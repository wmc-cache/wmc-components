/* eslints disable  */
import { App } from 'vue'
export {
  RulesProp
} from './defaultProps'

import WInput from './components/WInput'
import WForm from './components/WForm'
import WTokenImg from "./components/WTokenImg"
import swapHtmlElement from "./help/swapHtmlElement"
import http from "./http/index"
const components = [
  WForm,
  WInput,
  WTokenImg
]


const install = (app: App) => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export {
  WInput,
  WForm,
  install,
  WTokenImg,
  swapHtmlElement,
  http
}
export default {
  install
}