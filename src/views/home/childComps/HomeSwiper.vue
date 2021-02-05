<template>
  <swiper>
    <swiper-item v-for="(item,id) in banners" :key="id">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper/index"
export default {
  name: 'HomeSwiper',
  components: {
    Swiper, SwiperItem
  },
  data () {
    return {
      isLoad: false
    }
  },
  computed: {},
  props:{
    banners:{
      type: Array,
      default(){
        return []
      }
    }
  },
  methods: {
    imageLoad(){
      if(!this.isLoad){
        this.$emit('swiperImgLoad')
        this.isLoad = true
      }
      
    }
  },
}
</script>
<style scoped>

</style>