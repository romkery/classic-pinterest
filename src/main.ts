import Vue from 'vue';
import App from './App.vue';
import './scss/globals/_boilerplate.scss';
import store from '@/store/store';
import router from './router/router';
import VueRouter from 'vue-router';
import Fragment, {Plugin} from 'vue-fragment';
import ElementUI from 'element-ui';

Vue.use(Plugin);
Vue.use(Fragment.Plugin);
Vue.use(VueRouter);
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App), store, router
}).$mount('#app');


