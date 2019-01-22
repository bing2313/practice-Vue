<template>
  <div class="shopcart-box">
    <div class="mui-card shopcanshu" v-for="(item,i) in carslist" :key="i">
      <div class="mui-card-content">
        <div class="mui-card-content-inner oneshopinfo">
          <mt-switch
           v-model="$store.getters.getGoodsSelect[item.id]"
           @change="selectedChange(item.id, $store.getters.getGoodsSelect[item.id])"
           ></mt-switch>
          <img :src="item.thumb_path">
          <div class="shopinforight">
            <h2 class="title">{{item.title}}</h2>
            <p class="shopright">
              <span>￥{{item.sell_price}}</span>
              <numbox :goodsId="item.id"></numbox>
              <a href="#" @click.prevent="remove(item.id, i)">删除</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- <p>{{ $store.getters.getGoodsSelect }}</p> -->

    <div class="mui-card shopcanshu">
      <div class="mui-card-content">
        <div class="mui-card-content-inner twoshopinfo">
         <div class="pppp">
           <p> 总计（不含运费）</p>
            <p> 
              已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmout.count}}</span>
              件，总价 <span class="red">￥{{$store.getters.getGoodsCountAndAmout.amout}}</span>
            </p>
         </div>
         <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import numbox from '../common/numbox222.vue'
export default {
  components: {
    numbox
  },
  data(){
    return {
      carslist: [],
    }
  },
  created(){
    this.getshopcar();
  },
  methods: {
    getshopcar(){ // 发送请求，得到购物车商品列表
      // 在此遍历car里面的id
      let carsid = this.$store.state.car.map(item => {
        return item.id
      }).join(',');
      // 此时传递的id值是以逗号分隔的好多个id，这些id是遍历car数组里面的对象拿到的id
      this.$http.get('api/goods/getshopcarlist/' + carsid).then(res=>{
        if(res.body.status == 0){
          this.carslist = res.body.message;
        }
      })
    },
    remove(id, i){ // 删除商品
      // 删除carslist中的商品数据
      this.carslist.splice(i,1);
      // 删除store中的商品的数据
      this.$store.commit('removeFormCar',id);
    },
    selectedChange(id,val){ // 监听switch框的开关
      // console.log(id +'-----'+val);
      this.$store.commit('updateGoodsSelected',{id: id,selected: val})
    }
  }
}
</script>
<style lang="scss" scoped>
.shopcart-box {
  .oneshopinfo {
    display: flex;
    align-items: center;
    img {
      // width: 15%;
      // height: 15%;
      width: 70px;
      height: 70px;
      // display: block;
      margin: 0 10px;
    }
    .shopinforight {
      // flex: 7;
      h2 {
        font-size: 12px;
      }
      .title{
        font-size: 18px;
        color: #000;
        margin-bottom: 20px;
      }
      .shopright {
        display: flex;
        align-items: center;
        span{
          color: red;
          font-weight: 700;
        }
      }
    }
  }
  .twoshopinfo {
    display: flex;
    justify-content: space-between;
    .pppp {
      display: flex;
      flex-direction: column;
      .red {
        font-size: 16px;
        font-weight: 700;
        color: red;
      }
    }
  }
}
</style>

