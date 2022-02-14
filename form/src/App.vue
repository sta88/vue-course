<template>
  <div class="container">
    <component :is="currComponent"></component>
  </div>
</template>

<script>
  import Register from '@/components/Register'
  import Catalog from '@/components/Catalog'
  export default {
    name: "App",

    components: {
      Register,
      Catalog
    },

    props: 
        ['currComp']
    ,

    data() {
      return {
      };
    },

    methods: {
    },
    
    computed: {
    }
  };
</script>

<style>
</style>
