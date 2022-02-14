<template>
    <h1>Form</h1>
    <div class="col-md-4">
      <form
        @submit="onSubmit"
        action="/form.json"
        method="post">
        
        <div v-if="errors.length" class="text-danger">
          <b>Пожалуйста исправьте указанные ошибки:</b>
          <ul>
            <li 
              v-for="(error, idx) in errors" 
              v-bind:key="idx">
              {{ error }}
            </li>
          </ul>
        </div>

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
                v-on:input="checkPhone"
                type="phone"
                name="phoneNumber"
                class="form-control" 
                id="phone" 
                v-maska="phoneMask()">
              <div id="phoneHelp" class="form-text">Enter your phone: {{masks[code]}}</div>
            </div>
          </div>
        </div>

        <div v-if="phoneChecked" class="mb-3">
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
</template>

<script>
  export default {
    props: 
        ['currComp']
    ,

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
        pin: '',
        phoneChecked: false,
        flag: true,
        pincode: '',
        currComp: 'Register',
      };
    },

    methods: {
      onSubmit(e) {
        this.errors = [];
        if (!this.name) {
          this.errors.push('Требуется указать имя.');
        }
        if (!this.phone) {
          this.errors.push('Требуется указать телефон.');
        }

        if (this.pin) {
          if (this.pin !== this.pincode) {
            this.errors.push('Неверный код.');
          }
        } else {
            this.errors.push('Введите код.');
        }

        if (this.errors.length == 0) {
          let answerJson = e.target.getAttribute('action');
          
            this.axios.get(answerJson)
                .then((response) => {
                    if (response.data.success) {
                        this.currComp = 'Catalog';
                    } else {
                        this.errors.push('Ошибка передачи данных.');
                    }
                })
                .catch((error) => {
                    this.phoneChecked = false;
                    console.log(error);
                });
                  
          this.name = null;
          this.phone = null;
          this.pin = null;
        } else {
          e.preventDefault();
        }     
      },
      
      phoneMask() {
        return this.masks[this.code];
      },
      
      checkPhone() {
        console.log('----', this.flag);
        if (this.phone.length === this.masks[this.code].length) {
          if (this.flag) {
            this.axios.get('/form.json')
              .then((response) => {
                if (response.data.success) {
                  this.phoneChecked = true;
                  this.pincode = response.data.pincode;
                } else {
                  this.errors.push('Ошибка передачи данных.');
                }
              })
              .catch((error) => {
                this.phoneChecked = false;
                console.log(error);
              });
            this.flag = false;
          }
        } else {
          this.flag = true;
        }
      }
    }
  };
</script>
