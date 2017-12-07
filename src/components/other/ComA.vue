<template>
	<div>
		{{param}}
	</div>
</template>

<script>
export default{
	props: {
		'param': {
			type: String,
			// required: true
			default: 'i am children component default data'
		}
	}
}
</script>