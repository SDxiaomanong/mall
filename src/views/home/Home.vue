<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
  </div>

</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import {getHomeMultidata} from "network/home"
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data () {
    return {
      banners: [],
      recommends: [],
    }
  },
  created(){
    getHomeMultidata().then(res =>{
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  },
  methods: {
  },
}
</script>
<style scoped>
  #home{
    padding: 44px 0 54px;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
</style>