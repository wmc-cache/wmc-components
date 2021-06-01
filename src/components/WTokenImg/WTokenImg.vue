<template>
	<img ref="imgRef">
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
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
		request.onreadystatechange = (e) => {
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
</script>

<style>
</style>