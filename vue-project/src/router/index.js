/**
 * Created by Administrator on 2017/5/1.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import index from 'components/index.vue';
import other from 'components/other.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', component: index},
  {path: '/other', component: other}
];

export default new VueRouter({
  linkActiveClass: 'active',
  routes: routes
});