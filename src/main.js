import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './assets/main.css';
import axios from 'axios';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue'; 
import HomeView from './views/HomeView.vue'; 
import router from './router';
axios.defaults.baseURL = 'http://127.0.0.1:8000'


const app = createApp(App || HomeView); 

app.use(createPinia());
app.use(router);

app.mount('#app');
