<template>
    <div class="Table">
        <el-container>
            <el-header>
                <el-row>
                    <el-button type="danger" width="30%"
                               position="relative" @click="toMain">全部商品分类</el-button>

                    <el-button type="danger" width="30%"
                               position="relative" @click="toTable">总管理界面</el-button>

                </el-row>

            </el-header>
            <el-main>
                <el-input v-model="search" style="width: 30%"
                          placeholder="请输入用户账号" prefix-icon="el-icon-search"/>
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
                <el-table :data="orderData.filter(data=>!search || data.user_id.toString().includes(search))"
                          stripe
                          style="width: 100%">
                    <el-table-column>
                        <!--<template slot="header"  scope="scope" >-->
                        <!--<el-input v-model="search" style="width: 300px"-->
                        <!--placeholder="请输入书名" prefix-icon="el-icon-search"/>-->
                        <!--</template>-->
                        <el-table-column
                                prop="order_id"
                                label="订单号"
                                sortable
                        >
                        </el-table-column>
                        <el-table-column
                                prop="order_time"
                                label="订单时间"
                                sortable
                        ></el-table-column>

                        <el-table-column
                                prop="user_id"
                                label="用户账号"
                                sortable
                        ></el-table-column>

                        <el-table-column
                                align="right">
                            <template slot-scope="scope">


                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="orderInfo(scope.row.order_id)">查看订单详情</el-button>
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
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </el-main>
            <el-footer>购物指南</el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "orderManager",
        data () {
            return {
                search:'',

                orderData:[],
                orderVisible:false,
                itemInfo:[],
                title:[],
                totalCost:0,
                value1: '',
                value2: '',

            }
        },
        mounted(){
            this.loadAllOrder();
        },
        methods:{
            toMain(){
                this.$router.push({ path: `/` });
            },
            toTable(){
                this.$router.push({ path: `/Table` });
            },
            loadAllOrder(){
                var that=this;
                this.$myAxios.get('/ebook/allUserOrders')
                    .then(function (response) {
                        console.log(response.data);
                        for(var i=0;i<response.data.length;i++){
                            var objproject = {
                                "order_id" : response.data[i].id,//这个是赋值到一个数组对象里面去，开发的时候就是取到里面的值进行一个逻辑判断，要干嘛干嘛的。这个也加上他的下标
                                "order_time" : that.timeFormat(response.data[i].orderTime),
                                "user_id":response.data[i].user_id,

                            }
                            console.log(response.data[i].orderTime);
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
                            var objproject = {
                                "order_id" : response.data[i].id,//这个是赋值到一个数组对象里面去，开发的时候就是取到里面的值进行一个逻辑判断，要干嘛干嘛的。这个也加上他的下标
                                "order_time" : that.timeFormat(response.data[i].orderTime),

                                "user_id":response.data[i].user_id,

                            }
                            that.orderData.push(objproject);

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
            }
        }
    }
</script>

<style scoped>

</style>
