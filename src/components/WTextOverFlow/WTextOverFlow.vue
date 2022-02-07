<template>
  <div
    :class="textOver && !btnFold ? 'inner over' : 'inner'"
    :style="changeStyle"
    ref="divRef"
  >
    <pre>{{ content }}</pre>
  </div>
  <span class="btn" v-if="textOver" @click.stop="click"
    >{{ btnFold ? '收起' : '展开' }}
  </span>
</template>

<script>
import { ref, computed, watch, nextTick, defineComponent } from 'vue'
export default defineComponent({
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
    const divRef = ref()
    const content = ref('')
    const btnFold = ref(false) // 按钮默认显示展开
    const textOver = ref(false) // 文本是否超出n行
    const changeStyle = computed(() => {
      let height
      if (textOver.value) {
        height = btnFold.value ? 'min-content' : 23 * props.lines + 'px'
      } else {
        height = 'min-content'
      }
      return `-webkit-line-clamp:${props.lines};text-align:${props.textAlign};height:${height};${props.textStyle}`
    })
    const showBtnFun = () => {
      nextTick(() => {
        const textDom = divRef.value
        if (!textDom) return
        textOver.value = 23 * props.lines < textDom.scrollHeight
        btnFold.value = false
      })
    }
    watch(
      () => props.showContent,
      () => {
        content.value = props.showContent
        showBtnFun()
      }
      //   {
      //     immediate: true,
      //   }
    )
    const click = () => {
      btnFold.value = !btnFold.value
    }
    return {
      content,
      btnFold,
      textOver,
      click,
      changeStyle,
      divRef,
    }
  },
})
</script>

<style scoped>
.wrap {
  width: 100%;
  min-height: 40px;
}
.over {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow-wrap: break-word;
  overflow: hidden;
  /* 收起时添加的样式 */
}
.inner {
  width: 100%;
  /* height: 30px; */
  line-height: 23px;
  color: #606266;
}
.btn {
  font-size: 10px;
  color: rgba(0, 0, 0, 0.45);
  float: right;
  cursor: pointer;
  margin-top: 10px;
  line-height: 10px;
}
pre {
  margin: 0;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}
</style>
