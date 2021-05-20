(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['wmc-components'] = {}, global.Vue));
}(this, (function (exports, vue) { 'use strict';

  function mitt(n){return {all:n=n||new Map,on:function(t,e){var i=n.get(t);i&&i.push(e)||n.set(t,[e]);},off:function(t,e){var i=n.get(t);i&&i.splice(i.indexOf(e)>>>0,1);},emit:function(t,e){(n.get(t)||[]).slice().map(function(n){n(e);}),(n.get("*")||[]).slice().map(function(n){n(t,e);});}}}

  const emitter = mitt();

  const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const errorMessageStyle = {
      color: "red",
      fontSize: "12px",
  };
  var script = vue.defineComponent({
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
          const inputValueRef = vue.computed({
              get: () => props.value || "",
              set: (val) => {
                  context.emit("update:value", val);
              },
          });
          const errorMessageStyleRef = vue.computed(() => props.errorMessageStyle);
          const inputRef = vue.reactive({
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
          vue.onMounted(() => {
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

  const _withId = /*#__PURE__*/vue.withScopeId("data-v-d4a7f3a2");

  const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
    return (vue.openBlock(), vue.createBlock("div", null, [
      vue.withDirectives(vue.createVNode("input", vue.mergeProps({
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.inputValueRef = $event)),
        class: {'invalid': _ctx.inputRef.error},
        onBlur: _cache[2] || (_cache[2] = (...args) => (_ctx.validateInput && _ctx.validateInput(...args)))
      }, _ctx.$attrs), null, 16 /* FULL_PROPS */), [
        [vue.vModelDynamic, _ctx.inputValueRef]
      ]),
      (_ctx.inputRef.error)
        ? (vue.openBlock(), vue.createBlock("div", {
            key: 0,
            style: _ctx.errorMessageStyleRef
          }, vue.toDisplayString(_ctx.inputRef.message), 5 /* TEXT, STYLE */))
        : vue.createCommentVNode("v-if", true)
    ]))
  });

  script.render = render;
  script.__scopeId = "data-v-d4a7f3a2";
  script.__file = "src/components/WInput/WInput.vue";

  script.install = (app) => {
      app.component(script.name, script);
  };

  var script$1 = vue.defineComponent({
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
          vue.onUnmounted(() => {
              emitter.off("form-item-created", callback);
          });
          return { submit };
      },
  });

  const _hoisted_1 = /*#__PURE__*/vue.createVNode("button", { type: "submit" }, "提交", -1 /* HOISTED */);

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock("form", null, [
      vue.renderSlot(_ctx.$slots, "default"),
      vue.renderSlot(_ctx.$slots, "submit", {}, () => [
        _hoisted_1
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

  exports.WForm = script$1;
  exports.WInput = script;
  exports.default = index;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
