<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  components: {

  },
  props:{
    probeType:{
      type: Number,
      default: 0
    },
    pullUpLoad:{
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null,
    }
  },
  mounted(){
    //创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      observeDOM: true,//解决了better-scroll2.0版本滚动条无法滚动的bug
      click: true,//解决了点击事件无法触发的bug
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    })
    //监听滚动的位置
    this.scroll.on('scroll',(position) => {
      this.$emit('scrollPosition',position)
    })
    //监听上拉事件
    this.scroll.on('pullingUp',() => {
      this.$emit('pullingUp')
    })
  },
  computed: {},
  methods: {
    scrollTo(x, y, time=300){
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp(){
      this.scroll.finishPullUp();
    }
  },
}
</script>
<style scoped>

</style>