import { App } from 'vue';
export { RulesProp } from './defaultProps';
import WInput from './components/WInput';
import WForm from './components/WForm';
import WTokenImg from "./components/WTokenImg";
declare const install: (app: App) => void;
export { WInput, WForm, install, WTokenImg };
declare const _default: {
    install: (app: App<any>) => void;
};
export default _default;
