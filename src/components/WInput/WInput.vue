<template>
	<div>
		<input
			v-model="inputValueRef"
			:class="{'invalid': inputRef.error}"
			@blur="validateInput"
			v-bind="$attrs"
		/>
		<div
			:style="errorMessageStyleRef"
			v-if="inputRef.error"
		>{{inputRef.message}}</div>
	</div>
</template>

<script lang="ts">
import { RulesProp } from "../../defaultProps";
import { emitter } from "../../defaultProps";
import { defineComponent, computed, PropType, onMounted, reactive } from "vue";
const emailReg =
	/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const errorMessageStyle: object = {
	color: "red",
	fontSize: "12px",
};
export default defineComponent({
	name: "w-input",
	props: {
		value: String,
		rules: Array as PropType<RulesProp>,
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
						default:
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
</script>

<style scoped>
.invalid {
	border: 1px solid red !important;
}
.errorMessageStyle {
	color: red;
	font-size: 12px;
}
</style>
