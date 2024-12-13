import { createRouter, createWebHistory } from 'vue-router';
import Home from './home.vue';
import Naruci from './naruci.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/naruci',
    name: 'Naruci',
    component: Naruci
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
