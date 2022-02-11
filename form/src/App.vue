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
              <select 
                v-model="code"
                class="form-select" 
                aria-label="Default select example">
                <option 
                  v-for="c in codes" 
                  v-bind:value="c.id"
                  :key = "c.id">
                  {{ c.value }}
                </option>
              </select>
            </div>
            <div class="col-9">
              <input
                v-model="phone"
                type="phone"
                name="phoneNumber"
                class="form-control" 
                id="phone" 
                v-maska="phoneMask()">
              <div id="phoneHelp" class="form-text">Enter your phone: {{masks[code]}}</div>
            </div>
          </div>
        </div>

        <div v-if="phone.length === masks[code].length" class="mb-3">
          <label for="pin" class="form-label">Код</label>
          <input
            id="pin"
            v-model="pin"
            type="text"
            name="pin"
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
      name: '',
      phone: '',
      code: 'ru',
      codes: [
        {id: 'ru', value: '+7'},
        {id: 'by', value: '+375'}
      ],
      masks: {
        'ru' : '###-###-##-##',
        'by' : '###-###-###'
      },
      pin: ''
    };
  },

  methods: {
    onSubmit(e) {
      if (this.name && this.phone) {        
        this.name = null;
        this.phone = null;
        
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
    
    phoneMask() {
      console.log(this.masks[this.code].length);
      return this.masks[this.code];
    }
  },
  
  computed: {
  }
};
</script>

<style>
</style>
