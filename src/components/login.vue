<template xmlns:el-col="http://www.w3.org/1999/html">
    <div class="login">
        <el-container>
            <el-header>
                <el-row>
                    <el-button type="danger" width="30%"
                               position="relative"
                   @click="toMain">全部商品分类</el-button>
                </el-row>
            </el-header>
            <el-main>
        <el-row id="top">

        </el-row>
        <el-row id="login">

            <el-col :span="10" :offset="2">
                <a><img src="../assets/dushu.jpeg" class="img-thumbnail " style="border-radius: 10%;" id="img"/> </a>
            </el-col>

            <el-col :span="10">
                <el-form>
                <el-row>
                    <h2>e-book登录</h2>
                </el-row>
                    <el-row><hr/></el-row>

                    <el-form-item>
                <el-row>
                    <el-input placeholder="账号" v-model="id" class="input"></el-input>
                </el-row>
                    </el-form-item>
                    <el-form-item>
                <el-row>
                    <el-input placeholder="密码" v-model="password" show-password class="input"></el-input>
                </el-row>
                    </el-form-item>
                    <el-form-item>
                <el-row>
                    <el-select placeholder="身份" v-model="status" class="input">
                        <el-option value="user" label="用户"></el-option>
                        <el-option value="manager" label="管理员"></el-option>
                    </el-select>

                </el-row>
                    </el-form-item>
                <el-row >
                    <el-col>
                        <el-button type="primary" class="button" @click="toMyorder" round>登录</el-button>
                    </el-col>
                    <el-col>
                        <el-button type="success" class="button" @click="toRegister" round>注册</el-button>
                    </el-col>
                </el-row>

                    <br/>

                </el-form>
            </el-col>
        </el-row>
            </el-main>
            <el-footer><p>购物指南</p></el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return{
                id:"",
                password:"",
                status:"",
                name:""
            }

        },
        methods:{
            toMain(){
                this.$router.push({ path: `/` });
            },
            toRegister(){
                this.$router.push({ path: `/Register` });
            },
            toMyorder(){
                var that=this;
                this.$myAxios.get('/ebook/check',{
                    params:{
                        id:this.id,password:this.password,
                        status:this.status

                    }
                })
                    .then(function (response) {
                        console.log(response);
                        if(response.status=="200"){

                            console.log(response.data.name);
                            if(response.data.status == "manager"&&response.data.status==that.status){
                                if(response.data.usable==1){
                                that.$router.push({ path: '/Table', query: { id:response.data.id,password:response.data.password,
                                        status:response.data.status,name:response.data.name }});}
                                else{ alert("当前账户不可用");}
                            }
                            else if(response.data.status == "user"&&response.data.status==that.status){
                                if(response.data.usable==1){
                                that.$router.push({ path: `/myOrder`,query: { id:response.data.id,password:response.data.password,
                                        status:response.data.status,name:response.data.name } });}
                                else { alert("当前账户不可用");}
                            }
                            else {alert("您的身份错误");}
                            that.GLOBAL.id=response.data.id;
                            //localStorage.setItem('uid',response.data.id);
                            that.GLOBAL.name=response.data.name;
                            that.GLOBAL.isLogin=1;
                            console.log(that.GLOBAL.id);
                            console.log(that.GLOBAL.id);
                            console.log(that.GLOBAL.isLogin);
                        }
                        else {alert("用户名或密码错误");}

                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("用户名或密码错误");


                    })
                    .then(function () {

                    });



            }
        }
    }
</script>

<style scoped>
    @import "../mycss/login.css";
</style>
