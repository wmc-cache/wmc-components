<template>
	<form>
		<slot name="default"></slot>
		<slot name="submit">
			<button type="submit">提交</button>
		</slot>
	</form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import { emitter } from "../../defaultProps";
type ValidateFunc = () => boolean;
export default defineComponent({
	name: "w-form",
	emits: ["form-submit-result"],
	setup(props, context) {
		const funcArr: ValidateFunc[] = [];
		const callback = (res?: ValidateFunc) => {
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
</script>

<style>
</style>
