<template>
  <div class="shoplist-box">
    <div @click="goInfo(item.id)" class="shoplist-box" v-for="item in shoplist" :key="item.id">
      <div class="shoplist-top">
        <img :src="item.img_url" alt="">
        <div class="title">{{item.title}}</div>
      </div>
      <div class="price">
        <span class="newprice">￥{{item.sell_price}}</span>
        <span class="oldprice"><del>￥{{item.market_price}}</del></span>
      </div>
      <div class="shoplist-bottom">
        <span>热卖中</span>
        <span>剩余{{item.stock_quantity}}件</span>
      </div>
    </div>
    <mt-button @click="showshoplist" size="large" plain>加载更多</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 第几页
      pageindex: 1,
      // 存储商品列表
      shoplist: []
    };
  },
  created(){
    // 在页面加载的钩子函数中调用加载商品列表
    this.getshoplist();
  },
  methods: {
    getshoplist(){
      this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(res=>{
        if(res.body.status == 0){
          // 使用数组拼接的形式将查询的添加到shoplist中
          this.shoplist = this.shoplist.concat(res.body.message);
        }
      })
    },
    showshoplist(){ // 点击加载更多，加载第2页的数据
      this.pageindex += 1;
      this.getshoplist();
    },
    goInfo(id){
      // 使用编程式导航跳转页面
      // this.$router.push({name: shopinfo, params: id});
      this.$router.push('/shopinfo/' + id);
    }
  }
}
</script>
<style lang="scss" scoped>
.shoplist-box {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  .shoplist-box {
    width: 49%;
    border: 1px solid #ccc;
    margin: 4px 0;
    box-shadow: 0px 0px 6px #ccc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .shoplist-top {
      flex: 1;
      width: 100%;
      background-color: #fff;
      img {
        width: 100%;
        display: block;
      }
      .title {
        margin: 2px;
        font-size: 14px;
        font-weight: 700;
      }
    }
    .price {
      margin:5px  0;
      .newprice {
        font-size: 16px;
        font-weight: 700;
        color: red;
      }
      .oldprice {
        font-size: 13px;
        margin-left: 20px;
      }
    }
    .shoplist-bottom {
      font-size: 13px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>