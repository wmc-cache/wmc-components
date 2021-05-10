/* eslints disable  */
import { App } from 'vue'
export {
  textDefaultProps, textStylePropNames, TextComponentProps,
  imageDefaultProps, imageStylePropsNames, ImageComponentProps,
  shapeDefaultProps, shapeStylePropsNames, ShapeComponentProps,
  AllComponentProps, RulesProp
} from './defaultProps'

import LText from './components/LText'
import LImage from './components/LImage'
import LShape from './components/LShape'
import WInput from './components/WInput'
import WForm from './components/WForm'

const components = [
  LText,
  LImage,
  LShape,
  WForm,
  WInput
]

const install = (app: App) => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export {
  LText,
  LImage,
  LShape,
  WInput,
  WForm,
  install
}
export default {
  install
}