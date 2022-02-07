import { App } from 'vue';
export { RulesProp } from './defaultProps';
import WInput from './components/WInput';
import WForm from './components/WForm';
import WTokenImg from "./components/WTokenImg";
import WTextOverFlow from './components/WTextOverFlow';
import swapHtmlElement from "./help/swapHtmlElement";
import http from "./http/index";
declare const install: (app: App) => void;
export { WInput, WForm, WTextOverFlow, install, WTokenImg, swapHtmlElement, http };
declare const _default: {
    install: (app: App<any>) => void;
};
export default _default;
