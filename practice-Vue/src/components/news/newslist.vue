<template>
  <div class="newslist-box">
    <ul class="mui-table-view">
				<router-link tag="li" :to="'/newsinfo?id='+item.id" class="mui-table-view-cell mui-media" v-for="item in newsinfo" :key="item.id">
				<!-- <router-link tag="li" :to="'/newsinfo/id'+item.id" class="mui-table-view-cell mui-media" v-for="item in newsinfo" :key="item.id"> -->
					<a href="javascript:;" class="">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class="mui-ellipsis">
                <span>发表时间：{{item.add_time | timeFormat}}</span>
                <span>浏览：{{item.click}} 次</span>
              </p>
						</div>
					</a>
				</router-link>
			</ul>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default { 
  data(){
    return {
      newsinfo:[]
    }
  },
  created(){
    this.getnewslist()
  },
  methods:{
    getnewslist(){
      this.$http.get('api/getnewslist','utf-8').then(res=>{
        if(res.body.status == 0){
          // 成功-将获得数据复制给data中的属性-newsinfo
          this.newsinfo = res.body.message;
        }else{
          // 失败
          Toast("新闻列表数据请求失败！");
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.newslist-box{
  ul{
    li{
      h1{
        font-size: 14px;
      }
      p{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #26a2ff;
      }
    }
  }
}
</style>
