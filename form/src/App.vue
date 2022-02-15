<template>
  <div class="container">
    <component :is="currComp" v-on:submitted="afterForm"></component>
  </div>
</template>

<script>
import Register from "@/components/Register";
import Catalog from "@/components/Catalog";
export default {
  name: "App",

  components: {
    Register,
    Catalog,
  },

  data() {
    return {
      currComp: 'Register',
    };
  },

  methods: {
    afterForm(str) {
      this.currComp = str;
    }
  },

  computed: {},
};
</script>

<style></style>
