<template>
  <div class="put-up">

    <header>市场挂单</header>

    <div class="put-info" v-for="(item,index) in putList">
      <ul>
        <li>{{item.com}}</li>
        <li>{{item.type}}</li>
        <li>{{item.quantity}}</li>
        <li>{{item.state}}</li>
        <li>{{item.way}}</li>
      </ul>
    </div>

    <div id="merchant-info">
      <ul id="con1" ref="con1" :class="{anim:animate==true}">
        <li v-for="(item,index) in bazaarList">
          <span>{{item.username}}</span>
          <span>{{item.ftype_s}}</span>
          <span>{{item.ffinishamount}}</span>
          <span>{{item.fstatus}}</span>
          <span>
            <img src="../../assets/cion_y.png" alt="银行卡">
            <img src="../../assets/cion_z.png" alt="支付宝">
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import common from "../../kits/domain.js"
  import {ajax} from "../../kits/http.js"

  export default {
    data(){
      return {
        animate:false,
        putList:[
          {
            com:'商户',
            type:'类型',
            quantity:'成交数量',
            state:'状态',
            way:'付款方式'
          }
        ],
        bazaarList:[
          // {
          //   merchants:'普通商户1',
          //   pay:'卖单',
          //   quantity:'1.032356565',
          //   state:'待审核'
          // }
        ]
      }
    },
    methods:{
      // 市场挂单无缝滚动方法
      scroll(){
        this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
            setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题
                this.bazaarList.push(this.bazaarList[0]);  // 将数组的第一个元素添加到数组的末尾
                this.bazaarList.shift();               //删除数组的第一个元素
                this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
            },500)
      }
    },
    computed:{},
    created(){
      // 1.0 市场挂单列表请求数据
      var url = common.apidomain + 'trade/c2c/entrust';
      var formData = new FormData();
      formData.append('ftradeid',15);
      formData.append('currentPage',1);
      formData.append('size',8);
      ajax(url, 'post', formData, (res) => {
        // console.log(res)
        // console.log(res.data.data)
        this.bazaarList = res.data.data;
      });

      //2.0 调用公告无缝滚动方法
      setInterval(this.scroll,2000);
    },
    components:{}
  }
</script>
<style scoped>
  /*市场挂单无缝滚动*/
  #merchant-info{
    overflow: hidden;
    height: 225px;
  }
  .anim{
    transition: all 0.5s;
    margin-top: -45px;
  }

.exchange {
  float: left;
  width: 100%;
  margin-top: 45px;
}

.put-up{
  /*float: left;*/
  /*width: 100%;*/
  /*padding: 0 100px 0 100px;*/
  /*margin-top: 45px;*/
  width: 1300px;
  margin: 0 auto;
  margin-top: 45px;
  /*float: left;
  width: 100%;
  padding: 0 100px 0 100px;*/
}

.put-up>header {
  width: 100%;
  height: 38px;
  font-size: 18px;
  border-bottom: 1px solid #11182c;
  color: #c2c3c8;
  text-align: left;
  padding-left: 2%;
}

.put-info {
  width: 100%;
  height: 60px;
  background: #0e1326;
  line-height: 60px;
  font-size: 14px;
}

.put-info>ul>li {
  width: 20%;
  float: left;
  color: #c2c3c8;
  font-size: 16px;
}

.put-info>ul>li+li {
  text-align: center;
}


#merchant-info>ul>li {
  height: 45px;
  background: #11182c;
}

#merchant-info>ul>li:hover {
  background: #0e1326;
  cursor: pointer;
}

#merchant-info>ul>li>span {
  display: block;
  width: 20%;
  height: 45px;
  float: left;
  line-height: 45px;
  font-size: 14px;
}

#merchant-info>ul>li>span+span {
  text-align: center;
}


#merchant-info>ul>li>span>img {
  margin-right: 15px;
}

#merchant-info>ul>li:nth-child(1)>span:nth-child(2),
#merchant-info>ul>li:nth-child(2)>span:nth-child(2) {
  color: #5cb85c;
}

#merchant-info>ul>li:nth-child(3)>span:nth-child(2),
#merchant-info>ul>li:nth-child(4)>span:nth-child(2) {
  color: #d9534f;
}

</style>
