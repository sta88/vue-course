<template>
  <div class="container">
    <Header />
    
    <component 
      :is="currComp" 
      v-on:submitted="afterForm" 
      v-on:named="inputName" 
      v-model:userName="userName"
      v-model:fullPhone="fullPhone">
    </component>
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
