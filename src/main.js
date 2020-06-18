import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import dragula from 'dragula';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(dragula);
Vue.use(ViewUI);
Vue.use(ElementUI);

Vue.prototype.dragula = dragula;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
