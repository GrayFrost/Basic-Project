/**
 * Created by Administrator on 2017/5/1.
 */
import Vue from 'vue';
import App from './App.vue';
import router from './src/router/index';

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');