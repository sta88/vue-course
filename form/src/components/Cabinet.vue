<template>
  <h2>Cabinet</h2>
  <br>
    {{ uName }}
  <ul class="nav nav-tabs">
    <li class="nav-item"    
      v-for="tab in tabs"
      :key="tab">
      <a 
        aria-current="page" 
        href="#"        
        :class="['nav-link', { active: currTab === tab }]"
        @click="currTab = tab">
        {{ tab }}
      </a>
    </li>
  </ul>
  <div class="tab-content">
	  <component :is="currTab" class="tab"></component>
  </div>
</template>


<script>
  import Profile from "@/components/Profile";
  import Orders from "@/components/Orders";
  import Favorites from "@/components/Favorites";

  export default {
    components: {
      Profile,
      Orders,
      Favorites
    },

    props: [
      'userName',
    ],

    data() {
      return {
        currTab: 'Profile',
        tabs: ['Profile', 'Orders', 'Favorites'],
        uName: this.userName,
      }
    },

    methods: {      
    }
  };
</script>

<style scoped>
  .tab-content {
    padding: 20px 0 0;
  }
</style>