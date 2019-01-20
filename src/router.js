import Vue from 'vue'
import Router from 'vue-router'
import home from './components/tabbar/home.vue'
import news from './components/tabbar/news.vue'
import shopcart from './components/tabbar/shopcart.vue'
import prolife from './components/tabbar/prolife.vue'
import newslist from './components/news/newslist.vue'
import newsinfo from './components/news/newsinfo.vue'
import photolist from './components/photos/photolist.vue'
import photolistinfo from './components/photos/photolistinfo.vue'
import shoplist from './components/shop/shoplist.vue'
import shopinfo from './components/shop/shopinfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/' , redirect: '/home'},
    { path: '/home', component: home},
    { path: '/news', component: news},
    { path: '/shopcart', component: shopcart},
    { path: '/prolife', component: prolife},
    { path: '/home/newslist', component: newslist},
    { path: '/newsinfo', component: newsinfo},
    // { path: '/newsinfo/:id', component: newsinfo}
    { path: '/home/photolist', component: photolist},
    { path: '/photolist/:id', component: photolistinfo},
    { path: '/home/shoplist', component: shoplist},
    // 使用编程式导航，为路由命名
    // { name: shopinfo, path: '/shopinfo/:id', component: shopinfo }
    { path: '/shopinfo/:id', component: shopinfo }
  ],
  linkActiveClass:'mui-active'
})
