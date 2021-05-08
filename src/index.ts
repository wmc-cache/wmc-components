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
import WFrom from './components/WFrom'

const components = [
  LText,
  LImage,
  LShape,
  WFrom,
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
  WFrom,
  install
}
export default {
  install
}