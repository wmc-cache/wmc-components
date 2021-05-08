/* eslints disable  */
import { without, mapValues, pick } from 'lodash-es';
import { computed, defineComponent, openBlock, createBlock, resolveDynamicComponent, createTextVNode, toDisplayString, withScopeId, withModifiers, withDirectives, createVNode, vModelText } from 'vue';

const commonDefaultProps = {
    // actions
    actionType: '',
    url: '',
    // size
    height: '',
    width: '373px',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    // border type
    borderStyle: 'none',
    borderColor: '#000',
    borderWidth: '0',
    borderRadius: '0',
    // shadow and opacity
    boxShadow: '0 0 0 #000000',
    opacity: '1',
    // position and x,y
    position: 'absolute',
    left: '0',
    top: '0',
    right: '0'
};
const textDefaultProps = {
    // basic props - font styles
    text: '正文内容',
    fontSize: '14px',
    fontFamily: '',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    lineHeight: '1',
    textAlign: 'left',
    color: '#000000',
    backgroundColor: '',
    ...commonDefaultProps
};
const imageDefaultProps = {
    src: 'test.url',
    ...commonDefaultProps
};
const shapeDefaultProps = {
    backgroundColor: '',
    ...commonDefaultProps
};
const isEditingProp = {
    isEditing: {
        type: Boolean,
        default: false
    }
};
const textStylePropNames = without(Object.keys(textDefaultProps), 'actionType', 'url', 'text');
const imageStylePropsNames = without(Object.keys(imageDefaultProps), 'actionType', 'url', 'src');
const shapeStylePropsNames = without(Object.keys(imageDefaultProps), 'actionType', 'url');
const transformToComponentProps = (props) => {
    const mapProps = mapValues(props, (item) => {
        return {
            type: item.constructor,
            default: item
        };
    });
    return { ...mapProps, ...isEditingProp };
};

const useComponentCommon = (props, picks) => {
    const styleProps = computed(() => pick(props, picks));
    const handleClick = () => {
        if (props.actionType === 'url' && props.url && !props.isEditing) {
            window.location.href = props.url;
        }
    };
    return {
        styleProps,
        handleClick
    };
};

const defaultProps = transformToComponentProps(textDefaultProps);
// array that contains style props
var script = defineComponent({
    name: 'l-text',
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        ...defaultProps
    },
    setup(props) {
        // 重用并且简化
        // 抽离并且获得 styleProps
        const { styleProps, handleClick } = useComponentCommon(props, textStylePropNames);
        return {
            styleProps,
            handleClick
        };
    }
});

const _withId = /*#__PURE__*/withScopeId("data-v-6bf95b7a");

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
    return (openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
        style: _ctx.styleProps,
        class: "l-text-component",
        onClick: _ctx.handleClick
    }, {
        default: _withId(() => [
            createTextVNode(toDisplayString(_ctx.text), 1 /* TEXT */)
        ]),
        _: 1 /* STABLE */
    }, 8 /* PROPS */, ["style", "onClick"]))
});

script.render = render;
script.__scopeId = "data-v-6bf95b7a";
script.__file = "src/components/LText/LText.vue";

script.install = (app) => {
    app.component(script.name, script);
};

const defaultProps$1 = transformToComponentProps(imageDefaultProps);
// array that contains style props
var script$1 = defineComponent({
    name: 'l-image',
    props: {
        ...defaultProps$1
    },
    setup(props) {
        // 重用并且简化
        // 抽离并且获得 styleProps
        const { styleProps, handleClick } = useComponentCommon(props, imageStylePropsNames);
        return {
            styleProps,
            handleClick
        };
    }
});

const _withId$1 = /*#__PURE__*/withScopeId("data-v-1e970aa2");

const render$1 = /*#__PURE__*/_withId$1((_ctx, _cache, $props, $setup, $data, $options) => {
    return (openBlock(), createBlock("img", {
        style: _ctx.styleProps,
        class: "l-image-component",
        onClick: _cache[1] || (_cache[1] = withModifiers((...args) => (_ctx.handleClick && _ctx.handleClick(...args)), ["prevent"])),
        src: _ctx.src
    }, null, 12 /* STYLE, PROPS */, ["src"]))
});

script$1.render = render$1;
script$1.__scopeId = "data-v-1e970aa2";
script$1.__file = "src/components/LImage/LImage.vue";

script$1.install = (app) => {
    app.component(script$1.name, script$1);
};

const defaultProps$2 = transformToComponentProps(shapeDefaultProps);
// array that contains style props
var script$2 = defineComponent({
    name: 'l-shape',
    props: {
        ...defaultProps$2
    },
    setup(props) {
        // 重用并且简化
        // 抽离并且获得 styleProps
        const { styleProps, handleClick } = useComponentCommon(props, shapeStylePropsNames);
        return {
            styleProps,
            handleClick
        };
    }
});

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return (openBlock(), createBlock("div", {
        style: _ctx.styleProps,
        class: "l-shape-component",
        onClick: _cache[1] || (_cache[1] = withModifiers((...args) => (_ctx.handleClick && _ctx.handleClick(...args)), ["prevent"]))
    }, null, 4 /* STYLE */))
}

script$2.render = render$2;
script$2.__file = "src/components/LShape/LShape.vue";

script$2.install = (app) => {
    app.component(script$2.name, script$2);
};

var script$3 = defineComponent({
    name: "w-input",
    props: {
        value: String,
        rules: Array,
    },
    setup(props, context) {
        const inputValueRef = computed({
            get: () => props.value || "",
            set: (val) => {
                //console.log(val);
                context.emit("update:value", val);
            },
        });
        const validateInput = () => {
            if (props.rules) {
                const allPassed = props.rules.every((rule) => {
                    let passed = true;
                    switch (rule.type) {
                        case "required":
                            passed = inputValueRef.value.trim() !== "";
                            break;
                    }
                    return passed;
                });
                console.log("是否通过", allPassed);
            }
        };
        return { inputValueRef, validateInput };
    },
});

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return (openBlock(), createBlock("div", null, [
        withDirectives(createVNode("input", {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.inputValueRef = $event)),
            onBlur: _cache[2] || (_cache[2] = (...args) => (_ctx.validateInput && _ctx.validateInput(...args)))
        }, null, 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
            [vModelText, _ctx.inputValueRef]
        ])
    ]))
}

script$3.render = render$3;
script$3.__file = "src/components/WInput/WInput.vue";

script$3.install = (app) => {
    app.component(script$3.name, script$3);
};

const components = [
    script,
    script$1,
    script$2,
    script$3
];
const install = (app) => {
    components.forEach(component => {
        app.component(component.name, component);
    });
};
var index = {
    install
};

export default index;
export { script$1 as LImage, script$2 as LShape, script as LText, script$3 as WInput, imageDefaultProps, imageStylePropsNames, install, shapeDefaultProps, shapeStylePropsNames, textDefaultProps, textStylePropNames };
