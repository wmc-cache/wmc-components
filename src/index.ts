/* eslints disable  */
import { App } from 'vue'
export {
  RulesProp
} from './defaultProps'

import WInput from './components/WInput'
import WForm from './components/WForm'
import WTokenImg from "./components/WTokenImg"
import useSwapNode from "./hooks/useSwapNode"
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
  useSwapNode
}
export default {
  install
}