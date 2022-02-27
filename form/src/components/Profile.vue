<template>
    <p v-if="!editName">
      <b>Your name</b><br>
        {{ uName }} <br>
        <u class="link-secondary" @click="editName=true">edit</u>
    </p>
    
    <div v-if="editName" class="col-md-4 mb-3">
      <Formname />
      <div class="btn btn-primary mt-2" @click="saveName">Save</div>
    </div>

    <p><b>Your phone</b><br>        
        {{ fullPhone }} <br>
        <u class="link-secondary">edit</u>
    </p>
</template>

<script>
import Formname from "@/components/Formname";

export default {
    components: {
      Formname,
    },

    props: {
	    fullPhone: String,
    },

    data() {
      return {
        editName: false,
      };
    },

    methods: {
      saveName() {
        this.editName = false;
      }
    },
    
    computed: {
        uName() {            
            return this.$store.state.username;
        }
    },
  };
</script>

<style scoped>
</style>