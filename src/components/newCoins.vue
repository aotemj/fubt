<template>
  <div>
  <!-- 新币投票页面 -->
    <!-- 1.0 头部 -->
     <Header class="header"></Header>
    <!-- 2.0 投票记录列表 -->
    <div class="newCoins">
      <!-- 新币投票表头 -->
      <header>
        <div class="left">新币投票</div>
        <!-- <div class="left">记录</div> -->
      </header>
      <!-- 数据展示部分 -->
      <div class="data">
        <div class="data-list">
          <ul>
            <li>序号</li>
            <li>币种</li>
            <li>名称</li>
            <li>赞成/反对</li>
            <li>参与人数</li>
            <li>操作</li>
          </ul>
          <div class="no-recode" v-show="dataList.length==0">暂无记录</div>
          <ul data-id ='item.id' v-for="(item,index) in dataList" v-show="dataList.length!==0">
            <li>{{index+1}}</li>
            <li>{{item.coinabbreviate}}</li>
            <li>{{item.coinname}}</li>
            <li>{{item.favor}}/{{item.oppose}}</li><!-- 赞成/反对 -->
            <li>{{item.partakenumber}}</li><!-- 投票总人数 -->
            <li>
              <button type="button" @click="vote(item.fid,1)" :id="item.fid">赞成</button>
              <button type="button" @click="vote(item.fid,2)" :id="item.fid">反对</button>
              <el-dialog title="添加投票" :visible.sync="dialogFormVisible" class="dialog-contentinfo" width="35%">
                <el-form :model="form" class="cent">
                  <el-form-item label="投票数" :label-width="formLabelWidth">
                    <el-input v-model="form.name1" class="input-info" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"></el-input>
                  </el-form-item>
                  <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="form.name2"  class="input-info" placeholder="备注"></el-input>
                  </el-form-item>
                  <el-form-item label="" :label-width="formLabelWidth">
                    <el-button class="buttomvote" @click="immediatelyvote(activeId)">立即投票</el-button>
                  </el-form-item>
                </el-form>
                <div class="tipchar"><span>投票方式：每投一票消耗1FUC(富链)币，</span>本站注册用户可以参与投票。</div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dia" class="operate">关闭</el-button>
                </div>
              </el-dialog>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 4.0 弹出提示 -->
    <tips></tips>
  </div>
</template>
<script>
  import Header from './header'
  import tips from './subcom/friendlyTips'//提示信息
  import common from "../kits/domain"
  import {ajax} from "../kits/http"
  export default {
    data(){
      return {
        dataList:[],
        activeId:'',//投票id
        // dialogFormVisible: false,
        form: {
          name1: '',
          name2: '',
        },
        formLabelWidth: '120px',
        sun:0,
      }
    },
    methods:{
      // 3.0立即投票点击事件
      immediatelyvote(id,sun){
        // console.log(e.target);
        if(this.form.name1==''){// 若没有输入提示输入
          this.$store.commit('changeDialogInfo','先填写投票数量！')
        }
        if(this.form.name1!==""){// 若输入了数字则正常发送ajax
          var url = common.apidomain + 'vote/addNewCoinVote';
          var formData = new FormData();
          formData.append('fid',id);
          formData.append('number',this.form.name1);//投票数量
          formData.append('fstate',this.sun); // 1：赞成
          // formData.append('fstate',2);    // 2: 反对
          formData.append('remarks',this.form.name2);//备注信息
          ajax(url, 'post', formData, (res) => {
            this.$store.commit('changeDialogInfo',res.data.msg);//如果成功：调用友情提示弹窗
            this.render();
            // console.log(this.form.name1);
            // console.log(this.form.name2);
            this.form.name1="";//完成后置空输入框
            this.form.name2="";//完成后置空输入框
          });
        }
      },
      // 2.0赞成反对投票按钮点击事件：
      vote(item,sun){
        this.$store.state.voteTipsStatus =true;//改变弹窗状态
        this.dataList.forEach((fid)=>{
          if(item.fid == fid){
            this.dataList = item;
          }
          // console.log(item)
        })
        // console.log(item);
        this.activeId  = item;
        this.sun=sun;
      },
      // 1.0 渲染新币投票列表
      render(){
        var url = common.apidomain + 'vote/newCoinVote';
        ajax(url, 'post', {}, (res) => {
          // console.log(res.data);
          // console.log(res.data.data);
          this.dataList=res.data.data;
        });
      },
      // 4.0大弹窗的确定和取消按钮事件 --关闭大弹窗
      dia(){
        this.$store.state.voteTipsStatus =false;
      },
    },
    computed:{
      // 5.0获取弹窗属性状态
      dialogFormVisible(){
        return this.$store.state.voteTipsStatus;
      }
    },
    created(){
      // 渲染列表
      this.render()
    },
    components:{
      Header,//头部
      tips//提示
    }
  }
</script>

<style scoped>
  /*弹出框部分样式-开始*/
  .dialog-contentinfo{
    text-align: left;
  }
  .cent{
    width: 60%;
    margin: 0;
  }
  .input-info{
    padding-left: 30px;
  }
  .buttomvote{
    /*width: 282px;*/
    color: #fff;
    width: 90%;
    height: 36px;
    line-height: 11px;
    margin-left: 30px;
    /*background-color: #449d44;*/
  }
  .buttomvote:hover{
    color: #fff;
    border-color: #C0C4CC;
    /*background-color: #398439;*/
    background-color: #11182C;
  }
  .el-form-item{
    margin-bottom: 10px;
  }
  .operate{
    color: #fff;
  }
  .operate:hover{
    background-color: #11182C;
    border-color: #C0C4CC;
    color: #fff;
  }
  .tipchar{
    text-align: center;
    font-size: 16px;
    padding:16px 0;
    color: #fff;
  }
  .tipchar>span{
    color: #FF0000;
  }

  /*弹出框部分样式-结束*/
  /*操作按钮部分*/
  button{
    width: 70px;
    height: 25px;
    background: transparent;
    border: 1px solid #c2c3c8;
    border-radius: 5px;
    font-size: 12px;
    line-height: 3px;
    display: inline-block;
    margin: 0 2px;
  }
  button:hover{
    border: 1px solid #245da2;
    color: #245da2;
    cursor: pointer;
  }

  .newCoins{
    width: 1300px;
    margin: 0 auto;
    line-height:60px;
    margin-top:100px;
  }
  header {
    height: 60px;
    line-height: 60px;
    overflow: hidden;
    background-color: #0E1326;
  }
  .left{
    float: left;
    font-size: 16px;
    padding-left: 20px;
  }
  /*数据展示部分*/
  .data{
    margin-top: 10px;
    background-color: #11182B;
  }
  .data-list>ul{
    height: 40px;
    line-height: 40px;
    overflow: hidden;
  }
  .data-list>ul:first-child{
    background-color: #0E1326;
    font-size: 14px;
  }
  .data-list>ul:not(:first-child):hover{
    background:#0E1326;
    cursor: pointer;
  }
  .data-list>ul>li {
    width: 16.666%;
    float: left;
  }
  .data-list>ul+ul{
    font-size: 12px;
  }

  /*暂无记录样式*/
  .no-recode{
    height: 400px;
    line-height: 400px;
  }

</style>
