import Vue from 'vue';
import App from './App';
import router from './router';
import vueScrollto from 'vue-scrollto';

Vue.use(vueScrollto);

new Vue({
   el: '#app',
   router,
   components: { App },
   render: h => h(App)
});
