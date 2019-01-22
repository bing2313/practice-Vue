<template>
  <div class="common-box">
    <h3>发表评论</h3>
    <textarea class="pinglun" placeholder="想说点什么？"  v-model="content"></textarea>
    <!-- <button type="button" class="mui-btn mui-btn-primary mui-btn-block">发表评论</button> -->
    <mt-button type="primary" size="large" @click="addcomment">发表评论</mt-button>
    <!-- 评论 -->
    <div class="pinglunbox" v-for="(item, index) in pinglun" :key="index">
      <div class="pingluntop">第{{index+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;时间：{{item.add_time | timeFormat}}</div>
      <div class="pinglincontent">{{item.content == 'undefined' ? '这个人很懒，没有留下足迹~~~' : item.content}}</div>
    </div>
    <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      pinglun:[],
      index: 1,
      content: ''
    };
  },
  props:["id"],
  created(){
    this.getpinglun()
  },
  methods:{
    getpinglun(){
      this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.index).then(res=>{
        if(res.body.status == 0){
          console.log(res.body);
          
          this.pinglun = this.pinglun.concat(res.body.message);
        }else{
          Toast("获取评论列表失败");
        }
        
      })
    },
    getmore(){
      this.index += 1;
      this.getpinglun();
    },
    addcomment(){ // 发表评论
      this.$http.post('api/postcomment/' + this.id ,{ content: this.content}).then(res => {
        // 当评论发表成功，手动将数据放到 pinglun的数组中，最前方
        this.pinglun.unshift({
          add_time: new Date(),
          content: this.content,
          user_name: '竹叶轻拂水'
        })
        this.content = '';
      });
    }
  }
}
</script>
<style lang="scss" scoped>
  .common-box {
    .pinglun {
      font-size: 12px;
      padding: 5px;
    }
    .pinglunbox {
      font-size: 14px;
      padding: 10px;
      .pingluntop {
        padding: 2px;
        background-color: rgba(0, 0, 0, .4);
      }
    }
  }
</style>