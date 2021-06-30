import { defineComponent, computed, reactive, onMounted, openBlock, createBlock, withDirectives, createVNode, mergeProps, vModelDynamic, toDisplayString, createCommentVNode, withScopeId, onUnmounted, renderSlot, withModifiers, ref } from 'vue';

function mitt(n){return {all:n=n||new Map,on:function(t,e){var i=n.get(t);i&&i.push(e)||n.set(t,[e]);},off:function(t,e){var i=n.get(t);i&&i.splice(i.indexOf(e)>>>0,1);},emit:function(t,e){(n.get(t)||[]).slice().map(function(n){n(e);}),(n.get("*")||[]).slice().map(function(n){n(t,e);});}}}

const emitter = mitt();

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const errorMessageStyle = {
    color: "red",
    fontSize: "12px",
};
var script = defineComponent({
    name: "w-input",
    props: {
        value: String,
        rules: Array,
        errorMessageStyle: {
            type: Object,
            default: errorMessageStyle,
        },
    },
    setup(props, context) {
        const inputValueRef = computed({
            get: () => props.value || "",
            set: (val) => {
                context.emit("update:value", val);
            },
        });
        const errorMessageStyleRef = computed(() => props.errorMessageStyle);
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
                        case "email":
                            passed = emailReg.test(inputValueRef.value);
                            break;
                        case "custom":
                            passed = rule.validator ? rule.validator() : true;
                            break;
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
        return {
            inputValueRef,
            validateInput,
            inputRef,
            errorMessageStyleRef,
        };
    },
});

const _withId = /*#__PURE__*/withScopeId("data-v-d4a7f3a2");

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
      ? (openBlock(), createBlock("div", {
          key: 0,
          style: _ctx.errorMessageStyleRef
        }, toDisplayString(_ctx.inputRef.message), 5 /* TEXT, STYLE */))
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

const _hoisted_1 = /*#__PURE__*/createVNode("button", { type: "submit" }, "提交", -1 /* HOISTED */);

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("form", null, [
    renderSlot(_ctx.$slots, "default"),
    createVNode("div", {
      onClick: _cache[1] || (_cache[1] = withModifiers((...args) => (_ctx.submit && _ctx.submit(...args)), ["prevent"]))
    }, [
      renderSlot(_ctx.$slots, "submit", {}, () => [
        _hoisted_1
      ])
    ])
  ]))
}

script$1.render = render$1;
script$1.__file = "src/components/WForm/WForm.vue";

script$1.install = (app) => {
    app.component(script$1.name, script$1);
};

var script$2 = defineComponent({
    name: "WTokenImg",
    props: {
        authSrc: {
            type: String,
            required: false,
            default: "",
        },
        token: {
            type: String,
            required: false,
            default: null,
        },
    },
    setup(props) {
        const imgRef = ref();
        const request = new XMLHttpRequest();
        request.responseType = "blob";
        request.open("get", props.authSrc, true);
        if (props.token) {
            request.setRequestHeader("Authorization", props.token);
        }
        request.onreadystatechange = () => {
            if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
                imgRef.value.src = URL.createObjectURL(request.response);
                imgRef.value.onload = () => {
                    URL.revokeObjectURL(imgRef.value.src);
                };
            }
        };
        request.send(null);
        return {
            imgRef,
        };
    },
});

const _hoisted_1$1 = { ref: "imgRef" };

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("img", _hoisted_1$1, null, 512 /* NEED_PATCH */))
}

script$2.render = render$2;
script$2.__file = "src/components/WTokenImg/WTokenImg.vue";

script$2.install = (app) => {
    app.component(script$2.name, script$2);
};

function swapHtmlElement(node1, node2) {
    const afterNode2 = node2.nextElementSibling || null;
    const parent = node2.parentNode || null;
    if (!parent) {
        console.error('元素节点必须要有父节点');
        return;
    }
    node1.replaceWith(node2);
    parent.insertBefore(node1, afterNode2);
}

function xhr(config) {
    const { data = null, url, method = "get" } = config;
    const request = new XMLHttpRequest();
    request.open(method.toUpperCase(), url, true);
    request.send(data);
}

function http(config) {
    xhr(config);
}

const components = [
    script$1,
    script,
    script$2
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
export { script$1 as WForm, script as WInput, script$2 as WTokenImg, http, install, swapHtmlElement };
