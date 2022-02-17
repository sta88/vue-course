<template>
    <p><b>Your name</b><br>
        {{ userName }}
    </p>
    <p><b>Your phone</b><br>
    ...
    </p>
</template>


<script>
  export default {
    props: [
      'userName',
    ],

    data() {
    },
  };
</script>

<style scoped>
</style>