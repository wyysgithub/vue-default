import Vue from "vue";
import Router from 'vue-router';

const home = ()=> import("@/components/pages/Home");
const routes = [
    {
        path:'/',
        name:'home',
        component:home,
    },
    {
        path:'/home',
        name:'home',
        component:home,
    }
]
Vue.use(Router);

const router = new Router({
    mode:"history",
    routes:routes
});
export default router