(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash-es'), require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'lodash-es', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.LegoComponents = {}, global._, global.Vue));
}(this, (function (exports, lodashEs, vue) { 'use strict';

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
  const textStylePropNames = lodashEs.without(Object.keys(textDefaultProps), 'actionType', 'url', 'text');
  const imageStylePropsNames = lodashEs.without(Object.keys(imageDefaultProps), 'actionType', 'url', 'src');
  const shapeStylePropsNames = lodashEs.without(Object.keys(imageDefaultProps), 'actionType', 'url');
  const transformToComponentProps = (props) => {
      const mapProps = lodashEs.mapValues(props, (item) => {
          return {
              type: item.constructor,
              default: item
          };
      });
      return { ...mapProps, ...isEditingProp };
  };

  const useComponentCommon = (props, picks) => {
      const styleProps = vue.computed(() => lodashEs.pick(props, picks));
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
  var script = vue.defineComponent({
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

  const _withId = /*#__PURE__*/vue.withScopeId("data-v-6bf95b7a");

  const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
    return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tag), {
      style: _ctx.styleProps,
      class: "l-text-component",
      onClick: _ctx.handleClick
    }, {
      default: _withId(() => [
        vue.createTextVNode(vue.toDisplayString(_ctx.text), 1 /* TEXT */)
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
  var script$1 = vue.defineComponent({
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

  const _withId$1 = /*#__PURE__*/vue.withScopeId("data-v-1e970aa2");

  const render$1 = /*#__PURE__*/_withId$1((_ctx, _cache, $props, $setup, $data, $options) => {
    return (vue.openBlock(), vue.createBlock("img", {
      style: _ctx.styleProps,
      class: "l-image-component",
      onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => (_ctx.handleClick && _ctx.handleClick(...args)), ["prevent"])),
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
  var script$2 = vue.defineComponent({
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
    return (vue.openBlock(), vue.createBlock("div", {
      style: _ctx.styleProps,
      class: "l-shape-component",
      onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => (_ctx.handleClick && _ctx.handleClick(...args)), ["prevent"]))
    }, null, 4 /* STYLE */))
  }

  script$2.render = render$2;
  script$2.__file = "src/components/LShape/LShape.vue";

  script$2.install = (app) => {
      app.component(script$2.name, script$2);
  };

  var script$3 = vue.defineComponent({
      name: "w-input",
      props: {
          value: String,
          rules: Array,
      },
      setup(props, context) {
          const inputValueRef = vue.computed({
              get: () => props.value || "",
              set: (val) => {
                  context.emit("update:value", val);
              },
          });
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
          return { inputValueRef, validateInput, inputRef };
      },
  });

  const _withId$2 = /*#__PURE__*/vue.withScopeId("data-v-d4a7f3a2");

  vue.pushScopeId("data-v-d4a7f3a2");
  const _hoisted_1 = {
    key: 0,
    class: "errorMessageStyle"
  };
  vue.popScopeId();

  const render$3 = /*#__PURE__*/_withId$2((_ctx, _cache, $props, $setup, $data, $options) => {
    return (vue.openBlock(), vue.createBlock("div", null, [
      vue.withDirectives(vue.createVNode("input", vue.mergeProps({
        "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.inputValueRef = $event)),
        class: {'invalid': _ctx.inputRef.error},
        onBlur: _cache[2] || (_cache[2] = (...args) => (_ctx.validateInput && _ctx.validateInput(...args)))
      }, _ctx.$attrs), null, 16 /* FULL_PROPS */), [
        [vue.vModelDynamic, _ctx.inputValueRef]
      ]),
      (_ctx.inputRef.error)
        ? (vue.openBlock(), vue.createBlock("div", _hoisted_1, vue.toDisplayString(_ctx.inputRef.message), 1 /* TEXT */))
        : vue.createCommentVNode("v-if", true)
    ]))
  });

  script$3.render = render$3;
  script$3.__scopeId = "data-v-d4a7f3a2";
  script$3.__file = "src/components/WInput/WInput.vue";

  script$3.install = (app) => {
      app.component(script$3.name, script$3);
  };

  var script$4 = vue.defineComponent({
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

  const _hoisted_1$1 = /*#__PURE__*/vue.createVNode("button", { type: "submit" }, "提交", -1 /* HOISTED */);

  function render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock("form", null, [
      vue.renderSlot(_ctx.$slots, "default"),
      vue.renderSlot(_ctx.$slots, "submit", {}, () => [
        _hoisted_1$1
      ])
    ]))
  }

  script$4.render = render$4;
  script$4.__file = "src/components/WForm/WForm.vue";

  script$4.install = (app) => {
      app.component(script$4.name, script$4);
  };

  const components = [
      script,
      script$1,
      script$2,
      script$4,
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

  exports.LImage = script$1;
  exports.LShape = script$2;
  exports.LText = script;
  exports.WForm = script$4;
  exports.WInput = script$3;
  exports.default = index;
  exports.imageDefaultProps = imageDefaultProps;
  exports.imageStylePropsNames = imageStylePropsNames;
  exports.install = install;
  exports.shapeDefaultProps = shapeDefaultProps;
  exports.shapeStylePropsNames = shapeStylePropsNames;
  exports.textDefaultProps = textDefaultProps;
  exports.textStylePropNames = textStylePropNames;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
