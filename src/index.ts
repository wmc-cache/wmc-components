/* eslints disable  */
import { App } from 'vue'
export {
  RulesProp
} from './defaultProps'

import WInput from './components/WInput'
import WForm from './components/WForm'
import WTokenImg from "./components/WTokenImg"
import WTextOverFlow from './components/WTextOverFlow'
import swapHtmlElement from "./help/swapHtmlElement"
import http from "./http/index"
const components = [
  WForm,
  WInput,
  WTokenImg,
  WTextOverFlow
]


const install = (app: App) => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export {
  WInput,
  WForm,
  WTextOverFlow,
  install,
  WTokenImg,
  swapHtmlElement,
  http
}
export default {
  install
}