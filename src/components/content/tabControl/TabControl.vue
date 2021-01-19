<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
      class="tab-control-item"
      :class="{active: currentIndex === index}"
      @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {

  },
  props:{
    titles:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {
      currentIndex:0,
    }
  },
  computed: {},
  methods: {
    itemClick(index){
      this.currentIndex = index;
      this.$emit('tabClick',index)
    }
  },
}
</script>
<style scoped>
  .tab-control{
    display: flex;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{
    padding: 4px;
  }

  .active span{
    color: var(--color-high-text);
    border-bottom: 2px solid var(--color-tint);
  }

</style>