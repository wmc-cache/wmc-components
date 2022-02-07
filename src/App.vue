<template>
  <w-form>
    <w-input
      :errorMessageStyle="errorMessageStyle"
      :rules="inputRules"
      v-model:value="inputValueRef"
    ></w-input>
  </w-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import WForm from './components/WForm/WForm.vue'
import WInput from './components/WInput/WInput.vue'
const errorMessageStyle = { color: 'red', fontSize: '12px' }
export default defineComponent({
  components: { WInput, WForm },
  name: 'App',
  setup() {
    const inputValueRef = ref('wmc')
    const inputRules = [
      {
        type: 'required',
        message: '用户名不能为空',
      },
      {
        type: 'range',
        min: { length: 6, message: '用户名不能少于六位' },
      },
      {
        type: 'email',
        message: '邮箱格式不正确',
      },
      // {
      //   type: 'custom',
      //   validator: () => {
      //     if (inputValueRef.value == '1006004868@qq.com') {
      //       return true
      //     } else {
      //       return false
      //     }
      //   },
      //   message: '不是我的邮箱',
      // },
    ]
    return { errorMessageStyle, inputRules, inputValueRef }
  },
})
</script>
