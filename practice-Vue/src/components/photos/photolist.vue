<template>
  <div class="photolist-box">
    <!-- 上面滑动导航 -->
    <div class="tophuadong">
      <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
            <a class="mui-control-item mui-active" @click="getimglistsssss(0)" href="#">
							全部
						</a>
						<a class="mui-control-item" href="#" @click="getimglistsssss(item.id)" v-for="item in photofenlei" :key="item.id">
							{{item.title}}
						</a>
					</div>
				</div>
			</div>
    </div>
    <!-- 图片的列表 -->
    <div class="imglist">
      <ul>
        <router-link tag="li" :to="'/photolist/' + item.id" v-for="item in imglist" :key="item.id">
          <img  v-lazy="item.img_url">
          <!-- 图片上方的遮罩层 -->
          <div class="imginfo">
            <div class="imginfo-title" v-html="item.title"></div>
            <div class="imginfo-content" v-html="item.content"></div>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import mui from '../../../node_modules/mui/js/mui.min.js'
export default {
  data() {
    return {
      photofenlei: [],
      imglist: []
    };
  },
  created(){
    this.getimglist();
    // 页面一进来默认加载全部
    this.getimglistsssss(0);
  },
  methods: {
    getimglist(){
      this.$http.get('api/getimgcategory').then(res => {
        this.photofenlei = res.body.message;
      })
    },
    getimglistsssss(id){
      this.$http.get('api/getimages/' + id ).then(res => {
        console.log(res.body);
        this.imglist = res.body.message;
      })
    }
  },
  mounted(){
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  }
}
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  touch-action: pan-y;
}
.photolist-box {
  .imglist {
    ul {
      margin: 0;
      padding: 10px;
      width: 100%;
      li {
        img {
          width: 100%;
          // background: #777;
        }
        img[lazy=loading] {
          width: 40px;
          height: 300px;
          margin: auto;
          // background: red;
        }
        list-style: none;
        width: 100%;
        margin: 10px 0;
        box-shadow: 0 0 6px #777;
        position: relative;
        .imginfo {
          position: absolute;
          bottom: 0px;
          width: 100%;
          height: 88px;
          background-color: rgba(0, 0, 0, 0.5);
          overflow: hidden;
          padding: 5px;
          color: #fff;
          .imginfo-title {
            font-size: 14px;
            font-weight: bold;
          }
          .imginfo-content {
            font-size: 13px;
          }
        }
        img {
          width: 100%;
          display: block;
        }
      }
    }
  }
}
</style>