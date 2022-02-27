<template>
    <h1>Register</h1>
    <br>
    <div class="col-md-4">
        <form @submit="onSubmit" action="/form.json" method="get">
            <div v-if="errors.length" class="text-danger">
                <b>Please correct:</b>
                <ul>
                    <li v-for="(error, idx) in errors" v-bind:key="idx">
                        {{ error }}
                    </li>
                </ul>
            </div>

            <div class="mb-3">
                <Formname />
            </div>

            <div class="mb-3">
                <label for="phone" class="form-label">Phone</label>
                <div class="row">
                    <div class="col-3">
                        <select
                            v-model="code"
                            class="form-select"
                            aria-label="Default select example"
                        >
                            <option
                                v-for="c in codes"
                                v-bind:value="c.id"
                                :key="c.id"
                            >
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
                            v-maska="phoneMask()"
                            autocomplete="off"
                        />
                        <div id="phoneHelp" class="form-text">
                            Enter your phone: {{ masks[code] }}
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="phoneChecked" class="mb-3">
                <label for="pin" class="form-label">Pin (for test 123456)</label>
                <input
                    id="pin"
                    v-model="pin"
                    type="text"
                    name="pin"
                    class="form-control"
                    autocomplete="off"
                />
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
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

    emits: [
        'update:fullPhone', 
    ],

    data() {
        return {
            errors: [],
            phone: "",
            code: "ru",
            codes: [
                { id: "ru", value: "+7" },
                { id: "by", value: "+375" },
            ],
            masks: {
                ru: "###-###-##-##",
                by: "###-###-###",
            },
            pin: "",
            phoneChecked: false,
            flag: true,
            pincode: "",
            currCode: "+7"
        };
    },

    methods: {
        onSubmit(e) {
            this.errors = [];
            if (!this.uName) {
                this.errors.push("Enter your name.");
            }
            if (!this.phone) {
                this.errors.push("Enter your phone.");
            }

            if (this.pin) {
                if (this.pin !== this.pincode) {
                    this.errors.push("Wrong pin.");
                }
            } else {
                this.errors.push("Enter pin.");
            }

            if (this.errors.length == 0) {
                e.preventDefault();
                let answerJson = e.target.getAttribute("action");

                this.axios
                    .get(answerJson)
                    .then((response) => {
                        if (response.data.success) {
                            this.$store.commit('change', {
                                name: "loggedIn",
                                value: true
                            });
                            console.log(this.$store.state.loggedIn);              
                            this.$router.push('/cabinet');
                        } else {
                            this.errors.push("Error submit.");
                        }
                    })
                    .catch((error) => {
                        this.phoneChecked = false;
                        console.log(error);
                    });

                this.uName = null;
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
            console.log("----", this.flag);
            if (this.phone.length === this.masks[this.code].length) {
                if (this.flag) {
                    this.axios
                        .get("/form.json")
                        .then((response) => {
                            if (response.data.success) {
                                this.phoneChecked = true;
                                this.pincode = response.data.pincode;
                                let _code = this.code;
                                let currCode;
                                this.codes.forEach(function(item) {
                                    if (item.id === _code) {
                                        currCode = item.value;
                                    }
                                });
                                this.$emit('update:fullPhone', currCode + ' ' + this.phone);
                            } else {
                                this.errors.push("Error submit.");
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
        },
    },
    
    computed: {
        uName() {            
            return this.$store.state.username;
        }
    }
};
</script>
