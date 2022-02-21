<template>
  <h2>Cabinet</h2>
  <br>
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
	  <component 
      :is="currTab" 
      :userName='userName' 
      :fullPhone='fullPhone' 
      class="tab">
    </component>
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

    props: {
	    userName: String,
	    fullPhone: String,
	  },

    data() {
      return {
        currTab: 'Profile',
        tabs: ['Profile', 'Orders', 'Favorites'],
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
  .nav-item {
    margin-right: 10px;
  }
</style>