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
    }
  },
  data () {
    return {
      scroll: null,
    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{
      observeDOM: true,//解决了better-scroll2.0版本滚动条无法滚动的bug
      click: true,//解决了点击事件无法触发的bug
      probeType: this.probeType
    })

    this.scroll.on('scroll',(position) => {
      this.$emit('scrollPosition',position)
    })
  },
  computed: {},
  methods: {
    scrollTo(x, y, time=300){
      this.scroll.scrollTo(x, y, time)
    }
  },
}
</script>
<style scoped>

</style>