<template>
    <p v-if="!editName">
      <b>Your name</b><br>
        {{ userName }} <br>
        <u class="link-secondary" @click="editName=true">edit</u>
    </p>
    
    <div v-if="editName" class="col-md-4 mb-3">
      <Formname  v-model:userName="uName"/>
      <div class="btn btn-primary"  @click="editName=false">Save</div>
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
	    userName: String,
	    fullPhone: String,
    },

    data() {
      return {
        editName: false,
      };
    },
  };
</script>

<style scoped>
</style>