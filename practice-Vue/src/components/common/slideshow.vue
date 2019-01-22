<template>
  <div class="slideshow-box">
    <mt-swipe class="slideshow" :auto="4000">
      <mt-swipe-item v-for="item in slideshows" :key="item.id">
        <img v-if="item.img" class="img" :src="item.img">
        <img v-else class="src" :src="item.src">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  props: ["slideshows"]
}
</script>
<style lang="scss" scoped>
  .slideshow-box {
    .slideshow{
      height: 30vh;
      .img{
        width: 100%;
        height: 30vh;
      }
      .src {
        height: 100%;
      }
    }
  }
</style>