<template>
  <div class="con-box">
    <Header class="header"></Header>
    <div class="k-line-box">
      <iframe class="k-Line" style="display: block;" frameborder="0" border="0" width="100%" height="100%" id="klineFullScreen" src="https://www.fubt.top/kline/fullstart.html?symbol=2&themename=dark"></iframe>
    </div>
  </div>
</template>
<script>
  import Header from "./header"
  export default {
    data(){
      return {}
    },
    methods:{},
    computed:{},
    created(){},
    components:{
      Header,
    }
  }
</script>
<style scoped>
  .k-line-box{
    width:600px;
    height:400px;
    margin-top:100px;
  }
  .k-Line{
    width:100%;
    height:100%;
  }
</style>
