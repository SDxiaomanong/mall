<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" class="recom-item">
      <a :href="item.link">
        <img :src="item.image">
        <div class="text">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {

  },
  props:{
    recommends:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {

    }
  },
  computed: {},
  methods: {

  },
}
</script>
<style scoped>
  .recommend{
    width: 100%;
    display: flex;
    text-align: center;
    padding: 12px 10px 25px;
    border-bottom: 8px solid #eee;
  }
  .recom-item{
    flex: 1;
  }
  .recom-item img{
    width: 70px;
  }
  .recom-item .text{
    font-size: 12px;
  }
</style>