<template>
  <div class="shoplistinfo-box">
    <!-- 加入购物车实现的小球的半场动画 -->
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div class="ball" v-show="flag"></div>
    </transition>
    <!-- 轮播图部分 -->
    <div class="swiper mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <slideshow :slideshows="slideshows"></slideshow>
        </div>
      </div>
    </div>
    <!-- 商品标题，加入购物车按钮部分 -->
    <div class="mui-card carbutton">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <h2 class="title">{{shopcanshu.title}}</h2>
          <p>
            市场价：<del class="oldprice">￥{{shopcanshu.market_price}}</del>
            &nbsp;&nbsp;
            销售价：<span class="newprice">￥{{shopcanshu.sell_price}}</span>
          </p>
          <div class="shopnum">购买数量：
            <numbox @getCount="getCount" :kucun="shopcanshu.stock_quantity"></numbox>
          </div>
          <div class="car-button">
            <mt-button type="primary">立即购买</mt-button>
            <mt-button class="button-right" type="danger" @click="addcar">加入购物车</mt-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品参数部分 -->
    <div class="mui-card shopcanshu">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <h2 class="title">商品参数</h2>
          <p>商品货号：{{shopcanshu.goods_no}}</p>
          <p>库存情况：{{shopcanshu.stock_quantity}}件</p>
          <p>上架时间：{{shopcanshu.add_time | timeFormat}}</p>
          <mt-button class="twjs" size="large" type="primary" plain>图文介绍</mt-button>
          <mt-button size="large" type="danger" plain>商品评论</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 导入轮播图组件
import slideshow from '../common/slideshow.vue'
// 导入数字框组件
import numbox from '../common/numberbox.vue'

export default {
  components: {
    slideshow,
    numbox
  },
  data() {
    return {
      id: this.$route.params.id,
      slideshows: [],
      shopcanshu: '',
      shopcount: 1,
      flag: false
    };
  },
  created(){
    // 获取详情的轮播图
    this.getinfoimg();
    // 获取商品详情的基本信息
    this.getshopinfo();
  },
  methods: {
    getCount(res){ // 拿到子组件传递过来的数字框的值
      this.shopcount = res;
    },
    getinfoimg() { // 获取商品详情的轮播图图片
      this.$http.get('api/getthumimages/' + this.id).then(res=>{
        this.slideshows = res.body.message;
      })
    },
    getshopinfo(){ // 获取商品参数区，价格标题等数据
      this.$http.get('api/goods/getinfo/' + this.id).then(res=>{
        // console.log(res.body);
        this.shopcanshu = res.body.message[0]
      })
    },
    beforeEnter(el) {
      // 动画之前
      el.style.transform="translate(0, 0)";
    },
    enter(el, done){
      // 动画时候
      // 求出下购物车身上的徽章的位置（动态获取小球需要运动的距离）
      // getBoundingClientRect 是对象到视口的距离
      let badge = document.getElementById('badge'),
      x = badge.getBoundingClientRect().left - el.getBoundingClientRect().left,
      y = badge.getBoundingClientRect().top - el.getBoundingClientRect().top;
      el.offsetWidth;
      el.style.transform=`translate(${x}px, ${y}px)`;
      el.style.transition='all 0.4s ease';
      done();
    },
    afterEnter(){
      // 动画结束时候
      this.flag = false;
    },
    addcar(){ // 点击加入购物车的事件函数
      this.flag = true;
      // 当我们点击了加入购物车按钮，我们根据当前商品的id，存储一个对象
      // 然后将此对象利用Store中 mutations方法，更新到state中的arr中
      // {id: 商品的id, price: 商品的价格, count: 加入购物车的数量, selected: 是否选中，默认选中}
      let goCar = {
        id: this.id,
        price: this.shopcanshu.sell_price,
        count: this.shopcount,
        selected: true
      }
      // 得到对象之后添加到store中的car里面，用mutations方法
      this.$store.commit('addCar',goCar);
    }
  }
}
</script>
<style lang="scss" scoped>
.shoplistinfo-box {
  position: relative;
  .title{
    font-size: 18px;
    color: #000;
    margin-bottom: 20px;
  }
  .ball {
    position: absolute;
    z-index: 999;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    left: 147px;
    top: 339px;
  }
  .swiper {
    text-align: center;
    background-color: #fff;
  }
  .carbutton {
    p {
      color: #000;
      font-size: 14px;
      .oldprice{
        font-size: 13px;
        color: #777;
      }
      .newprice {
        font-size: 15px;
        color: red;
        font-weight: 700;
      }
    }
    .shopnum {
      display: flex;
      align-items: center;
      margin: 10px 0;
    }
    .car-button {
      .button-right {
        margin-left: 10px;
      }
    }
  }
  .shopcanshu {
    .twjs {
      margin: 10px 0;
    }
  }
}
</style>