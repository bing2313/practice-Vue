<template>
  <div class="numberbox-box">
    <div class="mui-numbox" data-numbox-step="1" data-numbox-min='1' data-numbox-max='100'>
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input @change="countChange" ref="numbox" class="mui-numbox-input" v-bind:value="$store.getters.shopcount[goodsId]" readonly/>
        <button class="mui-btn mui-numbox-btn-plus">+</button>
    </div>
  </div>
</template>
<script>
import mui from '../../../node_modules/mui/js/mui.min'

export default {
  data() {
    return {
    };
  },
  props: ["goodsId"],
  mounted(){
    // 初始化mui
    mui('.mui-numbox').numbox()
  },
  methods: {
    countChange(){ // 数字框的change事件
      // 当文本框的数字改变之后，创建一个新的对象，属性名为id，属性值为count值
      // console.log(this.$refs.numbox.value)
      // 拿到文本框的值后，更新到store中
      this.$store.commit('updateGoodsInfo',{
        id: this.goodsId,
        count: this.$refs.numbox.value
      })
    }
  },
  watch: {
    // 由于.then是一个异步的操作
    // 当我们从父组件拿到库存数量时候，有可能是一个undefined
    // 所以在这里监听一下kucun的值的变化
    // 当kucun变化的时候，我们给数字框设置新的最大值
    kucun(newVal){
      mui('.mui-numbox').numbox().setOption('max',newVal)
    }
  }
}
</script>
<style lang="scss" scoped>
.numberbox-box {
  .mui-numbox {
    width: 110px;
    height: 30px;
    margin: 0 5px;
  }
}
</style>