<template>
    <a href="/register" class="btn btn-primary">зарегистрироваться</a>
    <!-- <component 
      :is="currComp" 
      v-on:submitted="afterForm" 
      v-on:named="inputName" 
      v-model:userName="userName"
      v-model:fullPhone="fullPhone">
    </component> -->
</template>

<script>
// import Register from "@/components/Register";
// import Cabinet from "@/components/Cabinet";

export default {
  name: "Main",

  components: {
    // Register,
    // Cabinet,
  },

  data() {
    return {
      currComp: 'Register',
      fullPhone: '',
      userName: '',
    };
  },

  methods: {
    afterForm(str) {
      this.currComp = str;
    },

    inputName(s) {
      this.userName = s;
    },
  },

  computed: {
  }
};
</script>

<style></style>
