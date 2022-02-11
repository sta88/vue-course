import { createApp } from "vue";
import App from "./App.vue";
import Maska from 'maska';
import axios from 'axios';
import VueAxios from 'vue-axios';

const app = createApp(App);
app.use(Maska);
app.mount('#app');
app.use(VueAxios, axios);
