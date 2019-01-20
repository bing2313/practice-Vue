// 导入所需的文件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import resource from 'vue-resource'
// 安装缩略图插件
import VuePreview from 'vue-preview'
import 'mint-ui/lib/style.min.css'
import '../node_modules/mui/css/mui.min.css'
import '../node_modules/mui/css/icons-extra.css'
// 导入vuex
import store from './store.js'
import mintUi from 'mint-ui'


// 注册一下
Vue.config.productionTip = false
Vue.use(mintUi)
Vue.use(resource)
// 注册缩略图插件
Vue.use(VuePreview)


// 全局的过滤器格式化时间
Vue.filter('timeFormat',function(dataStr,format="YYYY-MM-DD hh:mm:ss"){
  // 使用Node.js插件 comment 格式化时间
  return moment(dataStr).format(format);
});

// 注册全局的请求地址
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 配置全局的post请求的格式
Vue.http.emulateJSON = true;

// vm实例
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')