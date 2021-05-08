<template>
	<div>
		<input
			v-model="inputValueRef"
			@blur="validateInput"
		/>
	</div>
</template>

<script lang="ts">
import { emitter } from "../../defaultProps";
import { defineComponent, computed, PropType, onMounted } from "vue";
import { RulesProp } from "../../defaultProps";
export default defineComponent({
	name: "w-input",
	props: {
		value: String,
		rules: Array as PropType<RulesProp>,
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
		onMounted(() => {
			emitter.emit("form-item-created", validateInput);
		});

		return { inputValueRef, validateInput };
	},
});
</script>

<style>
</style>

