<template>
  <div class="container">
    <h1>Form</h1>
    <div class="col-md-4">
      <form
        @submit="onSubmit"
        action="src/assets/form.json"
        method="post">
        
        <p v-if="errors.length" class="text-danger">
          <b>Пожалуйста исправьте указанные ошибки:</b>
          <ul>
            <li 
              v-for="(error, idx) in errors" 
              v-bind:key="idx">
              {{ error }}
            </li>
          </ul>
        </p>

        <div class="mb-3">
          <label for="name" class="form-label">Имя</label>
          <input
            id="name"
            v-model="name"
            type="text"
            name="name"
            class="form-control" 
          >
        </div>

        <div class="mb-3">
          <label for="phone" class="form-label">Phone</label>
          <div class="row">
            <div class="col-3">
              <select class="form-select" aria-label="Default select example">
                <option value="+7">+7</option>
                <option value="+375">+375</option>
              </select>
            </div>
            <div class="col-9">
              <input
                v-model="phone"
                type="phone"
                name="phoneNumber"
                class="form-control" 
                id="phone" 
                v-maska="'###-###-##-##'">
              <div id="phoneHelp" class="form-text">Enter your phone. {{phone.length}}</div>
            </div>
          </div>
        </div>

        <div v-if="phone" class="mb-3">
          <label for="code" class="form-label">Код</label>
          <input
            id="code"
            v-model="code"
            type="text"
            name="code"
            class="form-control" 
          >
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      errors: [],
      name: null,
      phone: null,
      code: null
    };
  },

  methods: {
    onSubmit(e) {
      if (this.name && this.phone) {
        // let infoData = {
        //   name: this.name,
        //   phone: this.phone
        // };
        
        this.name = null;
        this.phone = null;
// console.log(infoData);
        e.preventDefault();

        let answerJson = e.target.getAttribute('action');
        
        fetch(answerJson)
          .then(response => {
            response.json();
            console.log(response.json());
          });

      } else {

        this.errors = [];

        if (!this.name) {
          this.errors.push('Требуется указать имя.');
        }
        if (!this.phone) {
          this.errors.push('Требуется указать телефон.');
        }

        e.preventDefault();
      }

    },
  }
};
</script>

<style>
</style>
