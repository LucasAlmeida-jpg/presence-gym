import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue'; 
import HomeView from './views/HomeView.vue'; 
import router from './router';

const app = createApp(App || HomeView); 

app.use(createPinia());
app.use(router);

app.mount('#app');
