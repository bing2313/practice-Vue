import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let car = JSON.parse(localStorage.getItem('car'))

export default new Vuex.Store({
  state: {
    // arr就是购物车，里面存储的对象就是加入购物车的商品
    car: car || [],
  },
  mutations: {
    addCar(state,shopinfo){ // 将对象存储到car中，并进行一定的校验
      let flag = false;
      state.car.some(item => {
        if(item.id == shopinfo.id){
          item.count = parseInt(item.count) + parseInt(shopinfo.count);
          flag = true;
          return true;
        }
      });
      if(!flag){
        state.car.push(shopinfo);
      }
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsInfo(state, goodsinfo){ // 点击数字框，修改商品的数量值
      // 遍历car中的数据，查找和我们点击的id一致的id
      state.car.some(item=>{
        if(item.id == goodsinfo.id){
          // 把点击的那个商品的count值更新到car里面
          item.count = parseInt(goodsinfo.count);
          return true;
        }
      })
      // 并更新一下localStorage中存储的
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    removeFormCar(state, id){ // 根据id删除store中的商品
      state.car.some((item,i)=>{
        if(item.id == id){
          state.car.splice(i,1);
          return true;
        }
      })
      // 并更新一下localStorage中存储的
      localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info){ // 将用户点击后的switch框的状态更新到store中
      state.car.some(item=>{
        // 遍历car，找到id和我们点击的那个商品id一致的商品
        if(item.id == info.id ){
          // 让我们点击的那个商品的selected同步到car上
          item.selected = info.selected;
          return true;
        }
      })
      // 并更新一下localStorage中存储的
      localStorage.setItem('car',JSON.stringify(state.car))
    }
  },
  getters: {
    addCount(state){ // 计算购物车中的商品数量，同步到购物车徽章上面
      let count = 0;
      state.car.forEach(item=>{
        count += parseInt(item.count);
      })
      return count;
    },
    shopcount(state){ // 得到每个商品在购物和的总数量，并同步到购物车页面的数字框中
      let obj = {};
      state.car.forEach(item=>{
        obj[item.id]=item.count;
      })
      return obj;
    },
    getGoodsSelect(state){ // 根据商品的id，来计算一下是否选中
      let o = {};
      state.car.forEach(item=>{
        o[item.id] = item.selected;
      })
      return o;
    },
    getGoodsCountAndAmout(state){ // 计算勾选的商品件数和总价
      let o = {
        count: 0, // 商品的总量
        amout: 0 // 商品的总价
      };
      state.car.forEach(item=>{
        if(item.selected){
          o.count += item.count;
          o.amout += item.count * item.price;
        }
      })
      return o;
    }
  }
})





