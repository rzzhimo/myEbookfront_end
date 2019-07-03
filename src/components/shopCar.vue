<template>
    <div class="shopCar">
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="12"><el-button-group>
                        <el-button type="danger" width="30%"
                                   position="relative" @click="toMain">全部商品分类</el-button>


                    </el-button-group></el-col>
                    <el-col :span="12"  align="right"><el-button-group>

                        <el-button type="primary" class="button2"  @click="myOrder">我的订单</el-button>

                    </el-button-group></el-col>

                </el-row>


            </el-header>
            <el-main>

                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <el-col :span="4" ><span>购物车商品</span></el-col>
                        <el-col :span="4"><span>作者</span></el-col>
                        <el-col :span="4"><span>语言</span></el-col>
                        <el-col :span="4"><span>总价</span></el-col>

                        <el-button style=" padding: 1px 0" type="text">操作按钮</el-button>
                    </div>
                    <div v-for="o in bookData.length" :key="o" class="text item">
                        <hr/>
                        <el-col :span="4" >{{ bookData[o-1].title+" " }}</el-col>
                        <el-col :span="4">{{ bookData2[o-1].author+" " }}</el-col>
                        <el-col :span="4">{{ bookData2[o-1].language+" " }}</el-col>
                        <el-col :span="4">{{ bookData2[o-1].price*bookData[o-1].num+" " }}</el-col>
                        <el-input-number v-model="bookData[o-1].num" @change="handleChange" :min="1" :max="10" label="数量"  position="relative" >
                        </el-input-number>
                        <el-button-group>
                            <el-checkbox v-model="bookData[o-1].inbuffer" border @click="changeIn(bookData[o-1].inbuffer,bookData2[o-1].price,bookData[o-1].num)"></el-checkbox>
                        <el-button type="danger"
                                    icon="el-icon-delete" @click="deleteCart(bookData[o-1].book_id)"></el-button>

                        <el-button type="primary"
                                    @click="addOrder(bookData2[o-1].book_id,bookData2[o-1].price,bookData[o-1].num)">立即购买</el-button>
                        </el-button-group>



                    </div>


                </el-card>
                <br/>
               <div align="right">
                   <el-row>共计：{{total}}</el-row>
                   <el-button-group>
                       <el-button type="primary"
                                  position="relative" @click="addOrderBooks" align="right">全部购买</el-button>
                   </el-button-group>
               </div>
            </el-main>
            <el-footer>购物指南</el-footer>
        </el-container>

    </div>
</template>

<script>
    export default {
        name: "shopCar",
        data () {
            return {
                search: '',

                bookData:[],
                bookData2:[],
                orderData:[],
                orderData2:[],
                total:0,
                myflag:0,


            }
        },
        mounted(){
            this.loadCart();
        },
        // computed: {
        //
        //
        // },
        methods:{
            toMain(){
                this.$router.push({ path: `/` });
            },
            myOrder(){
                this.$router.push({ path: `/myOrder` });
            },
            delete(){

            },
            handleChange(value) {
                console.log(value);
            },
            loadCart(){

                var that = this;
                console.log(that.GLOBAL.id);
                this.$myAxios.get('/ebook/allCarts',{
                    params:{
                        user_id:that.GLOBAL.id
                    }
                })
                    .then(function (response) {

                        for(var i=0;i<response.data.length;i++){
                            var objproject = {
                                //这个是赋值到一个数组对象里面去，开发的时候就是取到里面的值进行一个逻辑判断，要干嘛干嘛的。这个也加上他的下标
                                "title" : response.data[i].title,
                                "num": response.data[i].num,
                                "book_id":response.data[i].book_id,
                                "inbuffer":0

                            }

                            that.bookData.push(objproject);

                            //console.log(that.bookData[i].num);

                            //console.log(that.bookData[i].title);
                        }
                        that.$forceUpdate();//强制刷新
                        that.$options.methods.loadCartBook.bind(that)();


                    })
                    .catch(function (error) {
                        console.log(error);  // 失败
                    });



            },
            loadCartBook:function () {

                for (var j=0;j<this.bookData.length;j++){
                    var that=this;
                    console.log(that.bookData.length+"length");

                    this.$myAxios.get('/ebook/findBooks',{
                        params:{
                            book_id:that.bookData[j].book_id,

                        }
                    })
                        .then((response)=> {


                            var objproject = {
                                //这个是赋值到一个数组对象里面去，开发的时候就是取到里面的值进行一个逻辑判断。这个也加上他的下标


                                "book_id":response.data.book_id,
                                "author":response.data.author,
                                "language":response.data.language,
                                "price":response.data.price
                            }

                            that.bookData2.push(objproject);


                        })
                        .catch(function (error) {
                            console.log(error);  // 失败
                        });


                }
                this.$forceUpdate();//强制刷新
            },
            //买一种书
            addOrder:function (book_id,price,num) {
                console.log(book_id);
                console.log(price);
                console.log(num);
                console.log(this.GLOBAL.id);
                var that = this;

                this.$myAxios.get('/ebook/addItem',{
                    params:{
                        user_id:that.GLOBAL.id,
                        book_id:book_id,
                        price:price,
                        num:num,
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        that.$options.methods.deleteCart.bind(that)(book_id);
                        if(response.data=="Saved"){alert("购买成功");}
                        that.$router.push({ path: `/myOrder` });
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function () {
                        //always executed
                        //that.bookData=[];
                        //that.$options.methods.loadBook.bind(that)();
                    })
            },
            changeIn(inbuffer,price,num){
                this.total+=price*num;
                console.log(this.total);
                if(inbuffer==0){
                    inbuffer=1;
                }
                else {
                    inbuffer=0;
                }
                this.$forceUpdate();//强制刷新


            },
            //购买多种书
            addOrderBooks(){
                this.orderData=[];
                this.orderData2=[];
                for(var i=0;i<this.bookData.length;i++){
                    if(this.bookData[i].inbuffer==1){
                        this.orderData.push(this.bookData[i]);
                        this.orderData2.push(this.bookData2[i]);
                    }
                }
                //console.log(this.orderData);
                var buffer=this.orderData;
                var buffer2=this.orderData2;
                //console.log(buffer);
                var that=this;
                this.$myAxios.get('/ebook/addOrder',{
                    params:{
                        user_id:that.GLOBAL.id,

                    }
                })
                    .then(function (response) {
                        console.log(response.data);
                        for(var i=0;i<that.orderData.length;i++){
                            that.$options.methods.additem2.bind(that)(buffer[i].book_id,buffer2[i].price,buffer[i].num,response.data);
                            that.$options.methods.deleteCart.bind(that)(buffer[i].book_id);
                        }
                        alert("购买成功");
                        that.$router.push({ path: `/myOrder` });

                    })
                    .catch(function (error) {
                        console.log(error);
                    })

            },
            //删除购物车
            deleteCart(book_id){
                var that = this;

                this.$myAxios.get('/ebook/deleteCart',{
                    params:{
                        book_id:book_id,
                        user_id:that.GLOBAL.id,

                    }
                })
                    .then(function (response) {
                        console.log(response);
                        if(response.data==""){
                            //alert("删除购物车成功");
                            //return;
                            //that.myflag=1;
                            //that.$forceUpdate();//强制刷新
                            //that.$options.methods.loadCartBook.bind(that)();
                            //that.GLOBAL.id=localStorage.getItem('uid');
                        }
                        // alert("删除成功");
                        // that.$forceUpdate();//强制刷新
                        // that.$options.methods.loadCartBook.bind(that)();
                       // that.$router.push({ path: `/` });


                    })
                    .catch(function (error) {
                        console.log(error);
                        //that.$forceUpdate();//强制刷新
                    })
                    // .then(function () {
                    //     //that.$forceUpdate();//强制刷新
                    //     that.$options.methods.loadCartBook.bind(that)();
                    // })
            },
            additem2(book_id,price,num,order_id){
                console.log(book_id,price,num,order_id);
                var that = this;

                this.$myAxios.get('/ebook/addItem2',{
                    params:{
                        user_id:that.GLOBAL.id,
                        book_id:book_id,
                        price:price,
                        num:num,
                        oid:order_id
                    }
                })
                    .then(function (response) {
                        console.log(response);

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
