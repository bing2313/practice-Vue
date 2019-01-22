<template>
  <div class="numberbox-box">
    <!-- :data-numbox-max="kucun" -->
    <!-- <div class="mui-numbox" data-numbox-step="1" data-numbox-min="1">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input class="mui-input-numbox" type="number" value="1">
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div> -->
    <div class="mui-numbox"  data-numbox-min='1' data-numbox-max='100'>
      <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
      <input @change="count" ref="count" class="mui-numbox-input" />
      <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
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
  // shopcount 是数字框的数量，也是商品的数量
  props: ["kucun"],
  mounted(){
    // 初始化mui
    mui('.mui-numbox').numbox();
    // mui('.mui-numbox').numbox()
  },
  // updated(){
  //   // mui('.mui-numbox').();numbox
  // },
  watch: {
    // 由于.then是一个异步的操作
    // 当我们从父组件拿到库存数量时候，有可能是一个undefined
    // 所以在这里监听一下kucun的值的变化
    // 当kucun变化的时候，我们给数字框设置新的最大值
    kucun(newVal){
      // 在此设置了最大值，所以上面就不必设置了
      mui('.mui-numbox').numbox().setOption('max',newVal)
    }
  },
  methods: {
    count(){
      // 给父组件传值，将数字框的value值传给父组件
      this.$emit('getCount',parseInt(this.$refs.count.value))
    }
  }
}
</script>
<style lang="css" scoped>
  
</style>