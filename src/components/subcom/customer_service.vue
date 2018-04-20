<template>

  <div class="customer">
    <div class="customer_service">
      <p class="p"><img src="../../assets/qq.png" alt=""></p>
      <div class="service"><img src="../../assets/kf.png"/><span>咨询客服</span></div>

    </div>
  </div>

</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {},
    computed: {},
    created() {
    },
    components: {}
  }
</script>
<style scoped>
  .customer {
    position: fixed;
    right: 2%;
    bottom: 2%;
    z-index: 9999;
  }

  .customer_service {
    width: 170px;
    height: 50px;
    border-radius: 30px;
    background-color: #338FF5;
    font-size: 16px;
    line-height: 50px;
  }

  .p {
    display: none;
    position: relative;
    top: -136px;
    right: 0%;
  }

  .p > img {
    width: 80%;
  }

  .customer_service:hover .service {
    position: relative;
    top: -156px;
    cursor: pointer;
  }

  .customer_service:hover .p {
    display: block;

  }

  .service img {
    vertical-align: middle;
    margin: 0px 5px;
  }
</style>
