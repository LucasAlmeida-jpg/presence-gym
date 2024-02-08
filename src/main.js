import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue'; // Se você tiver um arquivo App.vue
import HomeView from './views/HomeView.vue'; // Certifique-se de ajustar o caminho corretamente
import router from './router';

const app = createApp(App || HomeView); // Use App ou HomeView dependendo da sua estrutura

app.use(createPinia());
app.use(router);

app.mount('#app');
