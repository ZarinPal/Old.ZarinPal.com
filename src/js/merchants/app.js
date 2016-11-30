import Vue from "vue";
import VueRouter from "vue-router";
import VueResource from 'vue-resource';
import MerchantList from './components/MerchantList.vue';
import Main from './components/Main.vue';
import app from './components/App.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
    base: __dirname,
    routes: [
        {
            path: '/cat/:cat/page/:page',
            name: 'MerchantList',
            component: MerchantList
        },
        {
            path: '/main',
            name: 'Main',
            component: Main
        },
        {
            path: '/',
            redirect: {
                name: 'Main'
            }
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

new Vue({
    el: '#app',
    router,
    components: {
        app
    }
});