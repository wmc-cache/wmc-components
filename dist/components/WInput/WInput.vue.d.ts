import { RulesProp } from "../../defaultProps";
import { PropType } from "vue";
declare const _default: import("vue").DefineComponent<{
    value: StringConstructor;
    rules: PropType<RulesProp>;
    errorMessageStyle: {
        type: ObjectConstructor;
        default: object;
    };
}, {
    inputValueRef: import("vue").WritableComputedRef<string>;
    validateInput: () => boolean | undefined;
    inputRef: {
        error: boolean;
        message: string;
    };
    errorMessageStyleRef: import("vue").ComputedRef<Record<string, any>>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    errorMessageStyle: Record<string, any>;
} & {
    value?: string | undefined;
    rules?: RulesProp | undefined;
}>, {
    errorMessageStyle: Record<string, any>;
}>;
export default _default;
