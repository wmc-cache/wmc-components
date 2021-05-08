import { App } from 'vue';
export { textDefaultProps, textStylePropNames, TextComponentProps, imageDefaultProps, imageStylePropsNames, ImageComponentProps, shapeDefaultProps, shapeStylePropsNames, ShapeComponentProps, AllComponentProps, RulesProp } from './defaultProps';
import LText from './components/LText';
import LImage from './components/LImage';
import LShape from './components/LShape';
import WInput from './components/WInput';
declare const install: (app: App) => void;
export { LText, LImage, LShape, WInput, install };
declare const _default: {
    install: (app: App<any>) => void;
};
export default _default;
