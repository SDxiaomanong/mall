<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControlCopy" v-show="isTabFixed"/>
    <scroll class="content" 
            ref="scroll" 
            :probeType='3' 
            :pullUpLoad='true' 
            @scrollPosition="scrollPosition"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl"/>
      <goods :goods="showGoods"></goods>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>

</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView"
  import FeatureView from "./childComps/FeatureView"

  import NavBar from "components/common/navbar/NavBar"
  import TabControl from "components/content/tabControl/TabControl"
  import Goods from "components/content/goods/GoodsList"
  import Scroll from "components/common/scroll/Scroll"
  import BackTop from "components/content/backTop/BackTop"

  import { getHomeMultidata, getHomeGoods } from "network/home"
  import { debounce } from "common/utils.js"

  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      Goods,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': { page: 0, list: [] }
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //请求banner的数据
      this.getHomeMultidata();
      //请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh)
      //监听item中图片加载完成
      this.$bus.$on('itemImgLoad', () => {
        refresh()
      })
    },
    methods: {
      /*
      *   事件监听相关方法
      **/
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
        this.$refs.tabControl.currentIndex = index;
        this.$refs.tabControlCopy.currentIndex = index
      },
      //返回顶部
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      scrollPosition(position) {
        // 判断backTop是否显示
        this.isShowBackTop = -position.y > 1000 ? true : false;
        // 决定tabControl是否吸顶
        this.isTabFixed = -position.y > this.tabOffsetTop
      },
      //加载更多
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImgLoad() {
        // 获取tabcontrol的offsetTop
        // 所有的组件都有一个属性$el:用于获取组件中的元素
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      },
      /*
      *   网络请求相关方法
      * */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })

        //完成下拉加载更多
        setTimeout(() => {
          this.$refs.scroll.finishPullUp()
        })
      }
    },
  }
</script>
<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* 浏览器默认的滚动是整个页面的滚动，需要用固定定位 */
    /* 这里用的better-scroll是局部滚动，不需要固定定位 */
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9; */
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>