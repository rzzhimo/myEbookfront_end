<template>
    <div class="bookInfo">
        <el-container>
        <el-header>
            <el-row>
                <el-col :span="12"><el-button-group>
                <el-button type="danger" width="30%"
                           position="relative" @click="toMain">全部商品分类</el-button>


                </el-button-group></el-col>
                <el-col :span="12"  align="right"><el-button-group>
                    <el-button type="primary" class="button2"   @click="shopCar">购物车</el-button>
                    <el-button type="primary" class="button2"  @click="myOrder">我的订单</el-button>

                </el-button-group></el-col>

            </el-row>

        </el-header>
        <el-main style="text-align:left">
            <el-row>
                <el-col :span="5">
                    <a><img :src=cover class="img-thumbnail book1" alt=""></a>
                </el-col>
                <el-col :span="14">
                    <el-row>
                        <h1 style="text-align:left">书籍介绍</h1>
                    </el-row>
                    <el-row>
                        <el-row>题目:{{title}}</el-row>
                        <el-row>作者:{{author}}</el-row>
                        <el-row>语言:{{language}}</el-row>
                        <el-row>价格:{{price}}</el-row>
                    </el-row>
                    <el-row>
                        <el-button-group>
                        <el-button type="danger" @click="dialogVisible = true" >加入购物车</el-button>
                        <el-dialog
                                title="加入购物车"
                                :visible.sync="dialogVisible"
                                width="30%"
                                >
                            <el-row>
                                <el-col ><a><img :src=cover class="img-thumbnail book2"></a></el-col>
                            </el-row>
                            <el-row><el-col><h1>{{title}}</h1></el-col></el-row>


                            <el-input-number v-model="num" :min="1" :max="10" label="数量"></el-input-number>
                            <span slot="footer" class="dialog-footer">

                            <el-button-group>
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="danger" @click="addcart">确 定</el-button>
                            </el-button-group>
                            </span>
                        </el-dialog>
                        <el-button type="primary" @click="first">马上购买</el-button>
                        <el-button type="primary"  @click="changedialogVisible">添加书评</el-button>
                        </el-button-group>
                    </el-row>

                </el-col>

                <el-col :span="5">推荐书籍</el-col>
            </el-row>
            <el-row>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="书籍梗概" name="first">这是一本神奇的书</el-tab-pane>
                    <el-tab-pane label="读者书评" name="second">
                        <el-row>

                            <el-dialog
                                    title="增加评价"
                                    :visible.sync="comdialogVisible"
                                    width="30%"
                            >
                                <el-row>
                                    <el-col>
                                        <el-row><el-col><h3>{{title}}</h3></el-col></el-row>
                                    </el-col>
                                    <el-col>
                                        <el-row>
                                            <el-input
                                                    type="textarea"
                                                    :rows="2"
                                                    placeholder="请输入内容"
                                                    v-model="commentarea">
                                            </el-input>
                                        </el-row>
                                    </el-col>
                                </el-row>



                                <span slot="footer" class="dialog-footer">

                                        <el-button-group>
                                        <el-button @click="comdialogVisible = false">取 消</el-button>
                                        <el-button type="danger" @click="addcomment">确 定</el-button>
                                         </el-button-group>
                                        </span>
                            </el-dialog>
                        </el-row>
                        <el-row>
                            <div class="content-2">
                                <ul class="qua_nav" v-for="obj in commentData" :key="obj">
                                    <li>用户"@{{obj["user_id"]}}"说:{{obj["comment"]}}</li>
                                    <br/>
                                </ul>

                            </div>
                        </el-row>

                    </el-tab-pane>

                </el-tabs>
            </el-row>

            <el-row>
                <div><h3 class="title">
                    猜您喜欢
                </h3></div>
            </el-row>
            <el-row>
                <el-col :span="12" :offset="6">
                    <a><img :src=cover class="img-thumbnail book2"></a>
                    <a><img :src=cover class="img-thumbnail book2"></a>
                    <a><img :src=cover class="img-thumbnail book2"></a>
                    <a><img :src=cover class="img-thumbnail book2"></a>
                </el-col>

            </el-row>
        </el-main>
        <el-footer>购物指南</el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "book",
        data() {
            return {
                num:1,
                dialogVisible: false,
                book_id:0,
                language:"",
                author:"",
                title:"",
                cover:"",
                price:0,
                user_id: this.GLOBAL.id,
                activeName: 'second',
                commentarea:"",
                comdialogVisible: false,
                commentData:[],
            };
        },
        mounted(){
            this.initBook();
            //this.loadComment();
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            toMain(){
                this.$router.push({ path: `/` });
            },
            shopCar(){
                this.$router.push({ path: `/shopCar` });
            },
            myOrder(){
                this.$router.push({ path: `/myOrder` });
            },
            initBook(){
                var that = this;

                this.$myAxios.get('/ebook/findBooks',{
                    params:{
                        book_id:that.GLOBAL.book_id,

                    }
                })
                    .then(function (response) {
                        //console.log(response);
                        that.book_id=response.data.book_id;
                        that.author=response.data.author;
                        that.title=response.data.title;
                        that.language = response.data.language;
                        that.price=response.data.price;
                        that.cover = "data:image/png;base64," + response.data.cover.toString();
                        //console.log(response.data.title);


                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function () {
                        //always executed
                        //that.$forceUpdate();//强制刷新
                        that.$options.methods.loadComment.bind(that)();
                    })
            },
            first(){
                alert("您应该先加入购物车");
            },
            //购物车不存在该书
            addcart2(){
                var that = this;

                this.$myAxios.get('/ebook/addCart2',{
                    params:{
                        book_id:that.book_id,
                        num:that.num,
                        user_id:that.user_id,
                        title:that.title,

                    }
                })
                    .then(function (response) {
                        console.log(that.user_id);
                        console.log(response);
                        alert("加入购物车成功");
                    })
                    .catch(function (error) {
                        console.log(error);

                    })
                    .then(function () {
                        //always executed

                    })

            },
            //购物车中已存在该书
            addcart(){
                if(!this.GLOBAL.id){
                    alert("您还未登录，请先登录");
                    return;
                }
                this.dialogVisible = false;
                var that = this;

                this.$myAxios.get('/ebook/addCart1',{
                    params:{
                        book_id:that.book_id,
                        num:that.num,
                        user_id:that.user_id,
                        title:that.title,

                    }
                })
                    .then(function (response) {
                        console.log(that.user_id);
                        console.log(response);
                        alert("加入购物车成功");
                    })
                    .catch(function (error) {
                        if(error!=""){
                            that.$options.methods.addcart2.bind(that)();
                        }

                    })
                    .then(function () {
                        //always executed


                    })
                console.log(that.GLOBAL.id);
            },
            addcomment(){
                this.changedialogVisible();
                var that = this;
                var bodyFormData = new FormData();
                bodyFormData.set('user_id', that.user_id);
                bodyFormData.set('book_id', that.book_id);
                bodyFormData.set('comment', this.commentarea);
                that.$myAxios({method: 'post',
                    url: '/ebook/saveComment',
                    data: bodyFormData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}}
                )
                    .then(function (response) {
                        console.log(response);
                        if(response.data){
                            alert("评论书本成功");
                            that.$options.methods.loadComment.bind(that)();}
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function () {
                        //always executed
                    });

                //this.loadComment();

            },
            loadComment(){
                this.commentData = [];
                var that= this;
                this.$myAxios.get('/ebook/findAllBybid',{
                    params:{
                        book_id:that.book_id
                    }
                })
                    .then(function (response)  {

                        console.log(response);
                        for(var i=0;i<response.data.length;i++){
                            var objproject = {
                                "comment_id" : response.data[i].cid,
                                "user_id" : response.data[i].uid,

                                "comment" : response.data[i].comment,
                                //"comments_id" :response.data[i].comments_id,
                            };
                            that.commentData.push(objproject);
                            //console.log(that.commentData[i]);

                            console.log(that.commentData[i].comment);

                        }
                        that.$forceUpdate();//强制刷新
                    })
                    .catch(function (error) {
                        console.log(error);
                    })

            },
            changedialogVisible(){
                if(this.comdialogVisible==1){
                    this.comdialogVisible=0;
                }else {
                    this.comdialogVisible=1;
                }
            },


        }

    }
</script>

<style scoped>
    @import "../mycss/book1.css";


</style>
