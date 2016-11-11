import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './components/App.vue';
import MerchantList from './components/MerchantList.vue';
import Main from './components/Main.vue';

Vue.use(VueResource);
Vue.use(VueRouter);

// routing
const router = new VueRouter();

router.map({
	'cat/:cat/page/:page': {
		component: MerchantList,
	},
	'main': {
		component: Main,
	}
});

router.beforeEach(function () {
	window.scrollTo(0, 0);
});

router.redirect({
	'*': '/main/',
});

router.start(App, '#app');
