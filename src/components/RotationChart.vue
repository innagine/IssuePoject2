<template>
  <el-carousel :interval="5000" arrow="always" height="500px">
    <el-carousel-item v-for="(item,index) in list" :key="index">
      <img :src="item.URl" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "RotationChart",
  props: {
    msg: String,
  },
  data() {
    return {
      list: [
          {"URl":require("../assets/nebula-10-1530144_1920.png")},
          {"URl":require("../assets/planet-581239.jpg")},
          {"URl":require("../assets/space-1451654.png")},
          {"URl":require("../assets/wallpaper-1531107_1920.jpg")},
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  height: 880px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #6fb7ff;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #409EFF;
}
</style>
