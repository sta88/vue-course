<template>
    <label for="name" class="form-label">Name</label>
    <input
        id="name"
        type="text"
        name="name"
        class="form-control"
        autocomplete="off"
        @input="setUsername"
    />
</template>

<script>
export default({
    methods: {
        setUsername() {
            this.$store.commit('change', {
                name: "username",
                value: event.target.value
            });
        }
    }
})
</script>
