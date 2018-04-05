<template>
    <div>
        <div class="user_div">
            <div class="user_info">
                <p class="username">{{ userCenter.floginname }}<span class="set">设置&nbsp;&nbsp;&nbsp;&nbsp;退出</span></p>
                <div class="userid">
                    <span>UID：{{ userCenter.fid }}</span>
                </div>
            </div>
            <div class="currency">
                <ul  class="currency_List" v-for="(item,index) in currencyList">
                    <li>{{ item.currency }}</li>
                    <li>{{ item.available }}</li>
                    <li>{{ item.frozen }}</li>
                </ul>
                <div class="currencylist">
                    <ul>
                        <!-- <li v-for="item in sitesList"><span>{{ item.total }}</span><span>{{ item.frozen }}</span><span>{{ item.ico }}</span></li> -->
                    </ul>
                </div>
                <div class="button_click" v-for="(item,index) in Chargeprovided">
                    <button>{{ item.charge }}</button>
                    <button>{{ item.provided }}</button>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
  import common from "../../kits/domain"
  import {ajax} from "../../kits/http"
export default {
    data(){
		return {
            userCenter:{

            },
            currencyList:[
                {
                currency:'币种',
                available:'可用',
                frozen:'冻结'
                }
            ],
            sitesList: [
                // { currency: 'FUC' ,available:'157978.3122' ,frozen:'0'},
                // { currency: 'BTC' ,available:'157' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
                // { currency: 'TKC' ,available:'9999993122' ,frozen:'0'},
            ],
            Chargeprovided:[
                {
                    charge:'充值充币',
                    provided:'提现提币'
                }
            ]
        }
    },
    created(){
        var url = common.apidomain + 'login';
        var formData = new FormData();
        formData.append('loginName','15994026836');
        formData.append('password','fbt15994026836');
        ajax(url, 'post', formData, (res) => {
            console.log(res.data);
            this.userCenter = res.data.data.user;
        });

    },
    methods:{

    },
    computed:{},
}
</script>
<style scoped>
    .userid,.username,.currency_List li{
        height: 30px;
        line-height: 30px;
        color: #c2c3c8;
        font-size: 14px;
    }
    .user_info{
        border-bottom: 2
        px solid rgba(255, 255, 255, 0.3);
    }
    .username{
        width: 100%;
        padding-left: 13%;
    }
    
    .userid span:first-child{
        display: inline-block;
        width: 46%;
        margin-left: 13%;
    }
    .set{
        display: inline-block;
        float: right;
        width: 25%;
        height: 20px;
        margin-right: 13%;
        color: #6bb1e1;
        margin-top: 20px;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        cursor: pointer;
    }
    /* .userid span:last-child{
        display: inline-block;
        width: 13%;
        height: 20px;
        line-height: 20px;
        text-align: center;
        float: right;
        cursor: pointer;
        border: 1px solid #c2c3c8;
        margin-right: 9%;
        font-size: 12px;
        margin-top: 5px;
    } */
    /* .userid span:last-child:hover{
        border: 1px solid #ff6000;
        color: #ff6000;
    } */
    .currency_List{
        display: flex;
    }
    .currency_List li{
        flex: 1;
        text-align: center;
    }
    .currencylist{
        height: 260px;
        overflow-y: scroll;
    }
    .currencylist ul li{
        height: 25px;
        line-height: 25px;
        display: flex;
        cursor: pointer;
    }
    .currencylist ul li span{
        display: inline-block;
        flex: 1;
        text-align: center;
    }

    .currencylist::-webkit-scrollbar {
        width: 2px;
    }
    
    .currencylist::-webkit-scrollbar-track-piece {
        background-color: #c2c3c8;
    }

    .currencylist::-webkit-scrollbar-track {
        background-color: #c2c3c8;
    }

    .currencylist::-webkit-scrollbar-thumb {
        background-color: #000;
    }

    .currencylist::-webkit-scrollbar-button {
        background-color: #fff;
        display: none;
    }
    .button_click{
        width: 100%;
    }
    .button_click button{
        width: 70%;
        height: 30px;
        line-height: 25px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        border-radius: 5px;
        margin: 0 auto;
    }
    .button_click button:first-child{
        background: #d9534f;
        margin: 30px auto 20px;
    }
    .button_click button:last-child{
        background: #5cb85c;
    }
</style>
