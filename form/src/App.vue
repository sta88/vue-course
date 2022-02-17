<template>
  <div class="container">
    <Header />

    <component :is="currComp" v-on:submitted="afterForm" v-model:user-name="userName"></component>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Register from "@/components/Register";
import Cabinet from "@/components/Cabinet";

export default {
  name: "App",

  components: {
    Header,
    Register,
    Cabinet,
  },

  data() {
    return {
      currComp: 'Register',
      userName: '',
    };
  },

  methods: {
    afterForm(str) {
      this.currComp = str;
    }
  },

  computed: {
  }
};
</script>

<style></style>
