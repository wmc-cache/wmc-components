import { without } from 'lodash-es';
import { defineComponent, computed, reactive, onMounted, pushScopeId, popScopeId, openBlock, createBlock, withDirectives, createVNode, mergeProps, vModelDynamic, toDisplayString, createCommentVNode, withScopeId, onUnmounted, renderSlot } from 'vue';

function mitt(n){return {all:n=n||new Map,on:function(t,e){var i=n.get(t);i&&i.push(e)||n.set(t,[e]);},off:function(t,e){var i=n.get(t);i&&i.splice(i.indexOf(e)>>>0,1);},emit:function(t,e){(n.get(t)||[]).slice().map(function(n){n(e);}),(n.get("*")||[]).slice().map(function(n){n(t,e);});}}}

const emitter = mitt();
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
without(Object.keys(textDefaultProps), 'actionType', 'url', 'text');
without(Object.keys(imageDefaultProps), 'actionType', 'url', 'src');
without(Object.keys(imageDefaultProps), 'actionType', 'url');

var script = defineComponent({
    name: "w-input",
    props: {
        value: String,
        rules: Array,
    },
    setup(props, context) {
        const inputValueRef = computed({
            get: () => props.value || "",
            set: (val) => {
                context.emit("update:value", val);
            },
        });
        const inputRef = reactive({
            error: false,
            message: "",
        });
        const validateInput = () => {
            if (props.rules) {
                const allPassed = props.rules.every((rule) => {
                    let passed = true;
                    inputRef.message = rule.message || "";
                    switch (rule.type) {
                        case "required":
                            passed = inputValueRef.value.trim() !== "";
                            break;
                        case "range": {
                            const { min, max } = rule;
                            if (min && inputValueRef.value.trim().length < min.length) {
                                passed = false;
                                inputRef.message = min.message;
                            }
                            if (max && inputValueRef.value.trim().length > max.length) {
                                passed = false;
                                inputRef.message = max.message;
                            }
                            break;
                        }
                    }
                    return passed;
                });
                inputRef.error = !allPassed;
                return allPassed;
            }
        };
        onMounted(() => {
            emitter.emit("form-item-created", validateInput);
        });
        return { inputValueRef, validateInput, inputRef };
    },
});

const _withId = /*#__PURE__*/withScopeId("data-v-d4a7f3a2");

pushScopeId("data-v-d4a7f3a2");
const _hoisted_1 = {
  key: 0,
  class: "errorMessageStyle"
};
popScopeId();

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return (openBlock(), createBlock("div", null, [
    withDirectives(createVNode("input", mergeProps({
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.inputValueRef = $event)),
      class: {'invalid': _ctx.inputRef.error},
      onBlur: _cache[2] || (_cache[2] = (...args) => (_ctx.validateInput && _ctx.validateInput(...args)))
    }, _ctx.$attrs), null, 16 /* FULL_PROPS */), [
      [vModelDynamic, _ctx.inputValueRef]
    ]),
    (_ctx.inputRef.error)
      ? (openBlock(), createBlock("div", _hoisted_1, toDisplayString(_ctx.inputRef.message), 1 /* TEXT */))
      : createCommentVNode("v-if", true)
  ]))
});

script.render = render;
script.__scopeId = "data-v-d4a7f3a2";
script.__file = "src/components/WInput/WInput.vue";

script.install = (app) => {
    app.component(script.name, script);
};

var script$1 = defineComponent({
    name: "w-form",
    emits: ["form-submit-result"],
    setup(props, context) {
        const funcArr = [];
        const callback = (res) => {
            if (res) {
                funcArr.push(res);
            }
        };
        const submit = () => {
            const result = funcArr.map((func) => func()).every((result) => result);
            context.emit("form-submit-result", result);
        };
        emitter.on("form-item-created", callback);
        onUnmounted(() => {
            emitter.off("form-item-created", callback);
        });
        return { submit };
    },
});

const _hoisted_1$1 = /*#__PURE__*/createVNode("button", { type: "submit" }, "提交", -1 /* HOISTED */);

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("form", null, [
    renderSlot(_ctx.$slots, "default"),
    renderSlot(_ctx.$slots, "submit", {}, () => [
      _hoisted_1$1
    ])
  ]))
}

script$1.render = render$1;
script$1.__file = "src/components/WForm/WForm.vue";

script$1.install = (app) => {
    app.component(script$1.name, script$1);
};

const components = [
    script$1,
    script
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
export { script$1 as WForm, script as WInput, install };
