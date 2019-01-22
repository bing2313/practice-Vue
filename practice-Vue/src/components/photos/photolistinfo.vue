<template>
  <div class="photolistinfo-box">
    <!-- 标题内容 -->
    <h2>{{ photoinfo.title }}</h2>
    <div class="towTitle">
      <span>创建时间：{{ photoinfo.add_time | timeFormat}}</span>
      <span>浏览人数：{{ photoinfo.click }}人</span>
    </div>
    <hr>

    <!-- 缩略图部分 -->
    <div class="imginfo">
      <vue-preview class="imginfo_ss" :slides="list" @close="handleClose"></vue-preview>
    </div>

    <!-- 文章内容 --> 
    <div class="infocontent" v-html="photoinfo.content">
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      // 获取url地址栏中的id参数
      id: this.$route.params.id,
      // 存放图片详情的信息
      photoinfo: [],
      // 缩略图图片的地址
      list: []
    };
  },
  created(){
    // 获取图片的详细信息
    this.getphotoinfo();
    // 调用缩略图的方法
    this.getimginfo();
  },
  methods: {
    getphotoinfo(){ // 获取单个图片详细信息
      this.$http.get('api/getimageInfo/' + this.id).then(res => {
        // console.log(res.body);
        this.photoinfo = res.body.message[0];
      })
    },
    getimginfo(){ // 缩略图图片,由于缩略图需要加载页面的时候加载进来，所以要在created钩子函数中调用
      this.$http.get('api/getthumimages/' + this.id).then(res => {
        // 由于缩略图要求要设置宽高，但是请求回来的数据里面没有，所以我们要手动添加
        res.body.message.forEach(item => {
          item.msrc = item.src;
          item.w = 600;
          item.h = 400;
        });
        this.list = res.body.message;
      });
    },
    handleClose(){}
  }
}
</script>
<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  .photolistinfo-box {
    padding: 0 15px;
    h2 {
      font-size: 18px;
      color: red;
      text-align: center;
      margin: 15px 0;
    }
    .towTitle {
      color: #000;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
    }
    .imginfo {
      img {
        width: 100%;
        display: block;
      } 
    }
  }
</style>