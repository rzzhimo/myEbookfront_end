import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import axios from "axios"


Vue.prototype.$myAxios = axios;  //把axios挂载到vue上，$myAxios这个名称可以自定义

import Global from './components/Global.vue'//引用文件
Vue.prototype.GLOBAL = Global//挂载到Vue实例上面

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
