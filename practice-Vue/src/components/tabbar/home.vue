<template>
  <div id="home">
    <!-- 轮播图部分 -->
    <!-- 用父传子的形式将轮播图列表图片传递给轮播图子组件 -->
    <slideshow :slideshows="slideshows"></slideshow>
    
    <!-- 九宫格内容 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9 ninegezi">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../assets/images/menu1.png">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../assets/images/menu2.png">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/shoplist">
          <img src="../../assets/images/menu3.png">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../assets/images/menu4.png">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../assets/images/menu5.png">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../assets/images/menu6.png">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
  </ul>

  </div>
</template>
<script>
// 导入mint-ui中的Toast
import { Toast } from 'mint-ui'
// 导入轮播图组件
import slideshow from '../common/slideshow.vue'
export default {
  components: {
    // 注册轮播图组件
    slideshow
  },
  data(){
    return {
      slideshows:[]
    }
  },
  created(){
    this.getslideshow();
  },
  methods:{
    getslideshow(){
      this.$http.get('api/getlunbo').then(res=>{
        // console.log(res.body);
        if(res.body.status == 0){
          // 成功
          this.slideshows = res.body.message;
          // Toast("请求轮播图图片成功！");
        }else{
          // 失败
          Toast("请求轮播图图片失败！");
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#home{
  .ninegezi{
    background-color: #fff;
    li{
      width: 33.33333%;
      img{
        width: 50%;
      }
    }
  }
}
</style>

