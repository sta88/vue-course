import { createApp } from "vue";
import App from "./App.vue";
import Maska from 'maska';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import store from "./store";

const app = createApp(App);
app.use(Maska);
app.use(router);
app.use(store);
app.mount('#app');
app.use(VueAxios, axios);
