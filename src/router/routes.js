import Vue from "vue";
import Router from 'vue-router';

const home = ()=> import("@/components/pages/Home");
const luckDraw = ()=> import("@/components/pages/LuckDraw");
const numTransform = ()=> import("@/components/pages/NumTransform");
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
    },
    {
        path:'/luckDraw',
        name:'luckDraw',
        component:luckDraw,
    },
    {
        path:'/numTransform',
        name:'numTransform',
        component:numTransform,
    }
]
Vue.use(Router);

const router = new Router({
    mode:"history",
    routes:routes
});
export default router