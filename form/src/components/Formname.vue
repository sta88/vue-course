<template>
    <label for="name" class="form-label">Name</label>
    <input
        id="name"
        type="text"
        name="name"
        class="form-control"
        autocomplete="off"
        v-bind:value="userName"
        @input="$emit('update:userName', $event.target.value)"
    />
</template>

<script>
export default({
    props: {
	    userName: String,
	},

    emits: [
        'update:userName', 
    ]
})
</script>
