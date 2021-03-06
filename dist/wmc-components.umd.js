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
      vue.createVNode("div", {
        onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => (_ctx.submit && _ctx.submit(...args)), ["prevent"]))
      }, [
        vue.renderSlot(_ctx.$slots, "submit", {}, () => [
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

  var script$2 = vue.defineComponent({
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
          const imgRef = vue.ref();
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
    return (vue.openBlock(), vue.createBlock("img", _hoisted_1$1, null, 512 /* NEED_PATCH */))
  }

  script$2.render = render$2;
  script$2.__file = "src/components/WTokenImg/WTokenImg.vue";

  script$2.install = (app) => {
      app.component(script$2.name, script$2);
  };

  var script$3 = vue.defineComponent({
    props: {
      showContent: {
        type: String,
        required: false,
        default: '',
      },
      lines: {
        type: Number,
        required: false,
        default: 1,
      },
      textAlign: {
        type: String,
        required: false,
        default: 'center',
      },
      textStyle: {
        type: String,
        required: false,
        default: '',
      },
    },
    setup(props) {
      const divRef = vue.ref();
      const content = vue.ref('');
      const btnFold = vue.ref(false); // 按钮默认显示展开
      const textOver = vue.ref(false); // 文本是否超出n行
      const changeStyle = vue.computed(() => {
        let height;
        if (textOver.value) {
          height = btnFold.value ? 'min-content' : 23 * props.lines + 'px';
        } else {
          height = 'min-content';
        }
        return `-webkit-line-clamp:${props.lines};text-align:${props.textAlign};height:${height};${props.textStyle}`
      });
      const showBtnFun = () => {
        vue.nextTick(() => {
          const textDom = divRef.value;
          if (!textDom) return
          textOver.value = 23 * props.lines < textDom.scrollHeight;
          btnFold.value = false;
        });
      };
      vue.watch(
        () => props.showContent,
        () => {
          content.value = props.showContent;
          showBtnFun();
        }
        //   {
        //     immediate: true,
        //   }
      );
      const click = () => {
        btnFold.value = !btnFold.value;
      };
      return {
        content,
        btnFold,
        textOver,
        click,
        changeStyle,
        divRef,
      }
    },
  });

  const _withId$1 = /*#__PURE__*/vue.withScopeId("data-v-552c861d");

  const render$3 = /*#__PURE__*/_withId$1((_ctx, _cache, $props, $setup, $data, $options) => {
    return (vue.openBlock(), vue.createBlock(vue.Fragment, null, [
      vue.createVNode("div", {
        class: _ctx.textOver && !_ctx.btnFold ? 'inner over' : 'inner',
        style: _ctx.changeStyle,
        ref: "divRef"
      }, [
        vue.createVNode("pre", null, vue.toDisplayString(_ctx.content), 1 /* TEXT */)
      ], 6 /* CLASS, STYLE */),
      (_ctx.textOver)
        ? (vue.openBlock(), vue.createBlock("span", {
            key: 0,
            class: "btn",
            onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => (_ctx.click && _ctx.click(...args)), ["stop"]))
          }, vue.toDisplayString(_ctx.btnFold ? '收起' : '展开'), 1 /* TEXT */))
        : vue.createCommentVNode("v-if", true)
    ], 64 /* STABLE_FRAGMENT */))
  });

  script$3.render = render$3;
  script$3.__scopeId = "data-v-552c861d";
  script$3.__file = "src/components/WTextOverFlow/WTextOverFlow.vue";

  script$3.install = (app) => {
      app.component(script$3.name, script$3);
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

  exports.WForm = script$1;
  exports.WInput = script;
  exports.WTextOverFlow = script$3;
  exports.WTokenImg = script$2;
  exports.default = index;
  exports.http = http;
  exports.install = install;
  exports.swapHtmlElement = swapHtmlElement;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
