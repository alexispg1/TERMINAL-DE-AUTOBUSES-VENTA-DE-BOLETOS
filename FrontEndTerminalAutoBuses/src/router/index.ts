import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import login from '../views/admin/login.vue';
import register from '../views/admin/register.vue';
import panel from '../views/admin/panel.vue';
import listaBuses from '../views/admin/listaBuses.vue';
import destinoBuses from '../views/admin/destinos.vue';
import historialVentas from '../views/admin/historialVentas.vue';
import asientos from '../views/admin/asientos.vue';
import metodoPago from '../views/admin/metodoPago.vue';
import forgotPassword from '../views/contrasenias/forgotPassword.vue';
import resetPassword from '../views/contrasenias/resetPassword.vue';
import twoStep from '../views/admin/twoStep.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/',name: 'home',component: Home,},
  {path: '/about',name: 'about',component: () => import('../views/About.vue'),},
  {path:'/login',name:'login',component:login},
  {path:'/register',name:'register',component:register},
  {path:'/panel',name:'panel',component:panel},
  {path:'/listabuses',name:'listabuses',component:listaBuses},
  {path:'/destinobuses',name:'destinobuses',component:destinoBuses},
  {path:'/historialventas',name:'historialventas',component:historialVentas},
  {path:'/asientos',name:'asientos',component:asientos},
  {path:'/metodopago',name:'metodopago',component:metodoPago},
  {path:'/forgotpassword',name:'forgotpassword',component:forgotPassword},
  {path:'/resetpassword/:id',name:'resetpassword',component:resetPassword},
  {path:'/twostep',name:'twoStep',component:twoStep},

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
