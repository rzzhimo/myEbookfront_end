<template>
    <div class="myOrder">
        <el-container>
            <el-header>

                <el-row>
                    <el-col :span="12"><el-button-group>
                        <el-button type="danger" width="30%"
                                   position="relative" @click="toMain">全部商品分类</el-button>


                    </el-button-group></el-col>
                    <el-col :span="12"  align="right"><el-button-group>
                        <el-button type="primary" class="button2"   @click="shopCar">购物车</el-button>

                    </el-button-group></el-col>


                </el-row>

            </el-header>
            <el-main>
                <div class="block">
                    <span class="demonstration"></span>
                    <el-date-picker
                            v-model="value1"
                            type="datetime"
                            placeholder="选择开始日期时间">
                    </el-date-picker>

                    <span class="demonstration"></span>
                    <el-date-picker
                            v-model="value2"
                            type="datetime"
                            placeholder="选择结束日期时间">
                    </el-date-picker>
                    <el-button type="danger" @click="searchOrder(value1,value2)">开始查询</el-button>
                </div>

                <el-card class="box-card">
                    <div slot="header" class="clearfix">

                        <el-col :span="4"><span>订单号</span></el-col>
                        <el-col :span="4"><span>用户号</span></el-col>

                        <el-col :span="8"><span>订单时间</span></el-col>
                        <el-button style=" padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                    <div v-for="o in orderData.length" :key="o" class="text item" >
                        <el-row style="height: 200px">
                            <el-col>
                        <el-col :span="4">

                            <el-row>{{ orderData[o-1].order_id +" " }}</el-row>
                            <!--<el-row><img :src="tableData[o].images" alt=""></el-row>-->
                        </el-col>
                        <!--<el-col :span="4"><img :src="tableData[o].images" alt=""></el-col>-->
                        <el-col :span="4">{{ orderData[o-1].user_id+" " }}</el-col>

                        <el-col :span="8">{{ orderData[o-1].order_time+" " }}</el-col>



                        <el-button-group>
                            <el-button type="danger"
                                       position="relative" icon="el-icon-delete" @click="deleteOrder(orderData[o-1].order_id)"></el-button>
                            <el-button type="primary"
                                       position="relative" @click="orderInfo(orderData[o-1].order_id)" >查看详情</el-button>
                            <el-dialog
                                    title="订单详情"
                                    :visible.sync="orderVisible"
                                    width="30%"
                            >
                                <div v-for="o in itemInfo.length" :key="o" class="text item" align="left">
                                    <hr/>
                                    <el-row>书的ISBN号: {{ itemInfo[o-1].item_id +" " }}</el-row>
                                    <el-row>书名: {{ title[o-1] +" " }}</el-row>
                                    <el-row>数量: {{ itemInfo[o-1].item_count +" " }}</el-row>
                                    <el-row>价格:{{ itemInfo[o-1].price +" " }}</el-row>
                                    <el-row>总价:{{ itemInfo[o-1].price *itemInfo[o-1].item_count +" " }}</el-row>
                                    <hr/>
                                </div>
                                <div><el-row>共计:{{ totalCost }}</el-row></div>
                                <span slot="footer" class="dialog-footer">

                            <el-button-group>
                                <el-button @click="orderVisible = false">取 消</el-button>
                                <el-button type="danger" @click="orderVisible = false">确 定</el-button>
                            </el-button-group>
                            </span>
                            </el-dialog>
                        </el-button-group>
                        <br/>
                            </el-col>
                        </el-row>
                    </div>
<!--                    <el-button type="danger" @click="totalConsume">查询总消费</el-button>-->



                </el-card>




            </el-main>
            <el-footer>购物指南</el-footer>
        </el-container>

    </div>
</template>

<script>
    export default {
        name: "myOrder",
        data () {
            return {
                search: '',


                orderData:[],
                id:this.GLOBAL.id,
                password:this.$route.query.password,
                status:this.$route.query.status,
                name:this.$route.query.name,
                orderVisible:false,
                itemInfo:[],
                title:[],
                totalCost:0,
                value1:'',
                value2:'',

            }
        },
        mounted(){
            this.loadOrder();
        },
        methods:{
            toMain(){
                // this.GLOBAL.id=this.id;
                // this.GLOBAL.name=this.name;
                // this.GLOBAL.isLogin=1;
                this.$router.push({ path: `/` });
            },
            shopCar(){
                this.$router.push({ path: `/shopCar` });
            },
            loadOrder(){
                var that=this;
                this.$myAxios.get('/ebook/allOrders',{
                    params:{
                        user_id:that.GLOBAL.id,

                    }
                })
                    .then(function (response) {
                        console.log(response.data);
                        for(var i=0;i<response.data.length;i++){
                            var objproject = {
                                "order_id" : response.data[i].id,//这个是赋值到一个数组对象里面去，开发的时候就是取到里面的值进行一个逻辑判断，要干嘛干嘛的。这个也加上他的下标
                                "order_time" : that.timeFormat(response.data[i].orderTime),
                                "order_time2" : response.data[i].orderTime,
                                "user_id":response.data[i].user_id,

                            }
                            console.log("type= "+typeof(response.data[i].orderTime));

                            that.orderData.push(objproject);

                        }

                        that.$forceUpdate();//强制刷新


                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            searchOrder(value1,value2){
                console.log(value1+"   "+value2);
                this.orderData=[];
                var that=this;
                this.$myAxios.get('/ebook/searchOrders',{
                    params:{
                        start:value1.toString(),
                        end:value2.toString(),

                    }
                })
                    .then(function (response) {
                        console.log(response.data);
                        for(var i=0;i<response.data.length;i++){
                            if(response.data[i].user_id==that.id){
                                var objproject = {
                                    "order_id" : response.data[i].id,//这个是赋值到一个数组对象里面去，开发的时候就是取到里面的值进行一个逻辑判断，要干嘛干嘛的。这个也加上他的下标
                                    "order_time" : that.timeFormat(response.data[i].orderTime),

                                    "user_id":response.data[i].user_id,

                                }
                                that.orderData.push(objproject);
                            }


                        }

                        that.$forceUpdate();//强制刷新


                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            timeFormat(time) {
                var d = new Date(time);

                var year = d.getFullYear();       //年
                var month = d.getMonth() + 1;     //月
                var day = d.getDate();            //日

                var hh = d.getHours();            //时
                var mm = d.getMinutes();          //分
                var ss = d.getSeconds();           //秒

                var clock = year + "/";

                if (month < 10)
                    clock += "0";

                clock += month + "/";

                if (day < 10)
                    clock += "0";

                clock += day + " ";

                if (hh < 10)
                    clock += "0";

                clock += hh + ":";
                if (mm < 10) clock += '0';
                clock += mm + ":";

                if (ss < 10) clock += '0';
                clock += ss;
                return (clock);
            },
            orderInfo(order_id){
                this.title=[];
                this.itemInfo=[];
                this.totalCost=0;
                this.orderVisible=true;
                var that=this;
                this.$myAxios.get('/ebook/orderInfo',{
                    params:{
                        oid:order_id,

                    }
                })
                    .then(function (response) {
                        console.log(response.data);
                        for(var i=0;i<response.data.length;i++){
                            var objproject = {
                                "item_count" : response.data[i].itemCount,//这个是赋值到一个数组对象里面去，开发的时候就是取到里面的值进行一个逻辑判断，要干嘛干嘛的。这个也加上他的下标
                                "item_id" : response.data[i].itemsId,
                                "price":response.data[i].price,

                            }
                            that.totalCost+=response.data[i].itemCount*response.data[i].price;
                            that.$options.methods.getTitle.bind(that)(response.data[i].itemsId);
                            that.itemInfo.push(objproject);



                        }

                        that.$forceUpdate();//强制刷新


                    })
                    .catch(function (error) {
                        console.log(error);
                    })

            },
            getTitle(bid){
                this.title=[];
                var that = this;
                this.$myAxios.get('/ebook/findBooks',{
                    params:{
                        book_id:bid,

                    }
                })
                    .then(function (response) {
                        console.log(response.data.title);
                        that.title.push(response.data.title);
                        that.$forceUpdate();//强制刷新

                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },

        }
    }
</script>

<style scoped>
    img{
        width: 50px;
        height: 70px;
    }
</style>
