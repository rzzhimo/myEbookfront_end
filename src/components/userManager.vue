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
                          placeholder="请输入用户名" prefix-icon="el-icon-search"/>

                <el-table :data="userData.filter(data=>!search || data.name.includes(search))"
                          stripe
                          style="width: 100%">
                    <el-table-column>
                        <!--<template slot="header"  scope="scope" >-->
                        <!--<el-input v-model="search" style="width: 300px"-->
                        <!--placeholder="请输入书名" prefix-icon="el-icon-search"/>-->
                        <!--</template>-->
                        <el-table-column
                                prop="user_id"
                                label="用户账号"
                                sortable
                        >
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="用户名"
                                sortable
                        ></el-table-column>

                        <el-table-column
                                prop="status"
                                label="角色"
                                sortable
                        ></el-table-column>
                        <el-table-column
                                prop="usable"
                                label="可用吗"
                                sortable
                        ></el-table-column>
                        <el-table-column
                                align="right">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        @click="unabled(scope.row)">禁用</el-button>

                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="abled(scope.row)">解禁</el-button>
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
        name: "userManager",
        data () {
            return {
                search:null,

                userData:[],

            }
        },
        mounted(){
            this.loadUser();
        },
        methods: {

            toMain(){
                this.$router.push({ path: `/` });
            },
            toTable(){
                this.$router.push({ path: `/Table` });
            },
            unabled(row){
                var that = this;
                this.$myAxios.get('/ebook/unableUser',{
                    params:{
                        id:row.user_id,

                    }
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function () {
                        //always executed
                        that.userData=[];
                        that.$options.methods.loadUser.bind(that)();
                    })
            },
            abled(row){
                var that = this;
                this.$myAxios.get('/ebook/ableUser',{
                    params:{
                        id:row.user_id,

                    }
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function () {
                        //always executed
                        that.userData=[];
                        that.$options.methods.loadUser.bind(that)();
                    })
            },
            loadUser:function () {
                var that = this;
                this.$myAxios.get('/ebook/allUsers')
                    .then((response)=> {
                        for(var i=0;i<response.data.length;i++){
                            var objproject = {
                                "user_id" : response.data[i].id,//这个是赋值到一个数组对象里面去，开发的时候就是取到里面的值进行一个逻辑判断，要干嘛干嘛的。这个也加上他的下标
                                "name" : response.data[i].name,
                                "status" :response.data[i].status,
                                "usable" :response.data[i].usable
                            }
                            that.userData.push(objproject);
                            //console.log(that.bookData[i]);

                            //console.log(that.bookData[i].title);

                        }
                        this.$forceUpdate();//强制刷新

                    })
                    .catch(function (error) {
                        console.log(error);  // 失败
                    });
            },
        }
    }
</script>

<style scoped>

</style>
