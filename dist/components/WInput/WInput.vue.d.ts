import { PropType } from "vue";
import { RulesProp } from "../../defaultProps";
declare const _default: import("vue").DefineComponent<{
    value: StringConstructor;
    rules: PropType<RulesProp>;
}, {
    inputValueRef: import("vue").WritableComputedRef<string>;
    validateInput: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    value?: string | undefined;
    rules?: RulesProp | undefined;
}>, {}>;
export default _default;
