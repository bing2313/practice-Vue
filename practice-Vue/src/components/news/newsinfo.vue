<template>
  <div class="newsinfo-box">
    <!-- 标题 -->
    <h2>{{onenewsinfo.title}}</h2>
    <!-- 副标题 -->
    <p class="towTitle">
      <span>发表时间：{{onenewsinfo.add_time | timeFormat}}</span>
      <span>浏览： {{onenewsinfo.click}} 次</span>
    </p>
    <hr>
    <div class="newsContent" v-html="onenewsinfo.content"></div>

    <!-- 评论区组件 -->
    <comment :id="id"></comment>
  </div>
</template>
<script>
import comment from '../common/common.vue'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      // 获取地址栏中的id
      id: this.$route.query.id,
      // id: this.$route.params.id,
      onenewsinfo: []
    }
  },
  created() {
    this.getnewsinfo()
  },
  components:{
    comment
  },
  methods: {
    getnewsinfo() {
      this.$http.get('api/getnew/' + this.id).then(res=>{
        console.log(res.body);
        if(res.body.status == 0) {
          // 成功
          this.onenewsinfo = res.body.message[0];
        }else{
          // 失败
          Toast("获取新闻数据失败");
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.newsinfo-box {
  padding: 0 15px;
  h2 {
    font-size: 18px;
    color: red;
    text-align: center;
    margin: 15px 0;
  }
  .towTitle {
    display: flex;
    justify-content: space-between;
    color: #26a2ff;
  }
}
</style>
