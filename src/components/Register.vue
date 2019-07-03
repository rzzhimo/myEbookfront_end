<template>
    <div class="register">
        <el-container>
            <el-header>
                <el-row>
                    <el-button type="danger" width="30%"
                               position="relative" @click="toMain">全部商品分类</el-button>
                </el-row>
            </el-header>
            <el-main>
                <el-form  class="form">
                    <el-row>
                        <h2>e-book注册</h2>
                    </el-row>
                    <el-row><hr/></el-row>
                    <el-form-item>
                        <el-row>
                            <el-input placeholder="姓名" v-model="name"  class="input"></el-input>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row>
                            <el-input placeholder="用户密码" v-model="password" show-password class="input" ></el-input>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row>
                            <el-input placeholder="再次输入密码" v-model="password2" show-password class="input"></el-input>
                        </el-row>
                    </el-form-item>

                    <el-form-item>
                        <el-row>
                            <el-input placeholder="手机" v-model="phone"  class="input"></el-input>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row>
                            <el-input placeholder="邮箱" v-model="email"  class="input"></el-input>
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
                    <el-row>

                        <el-button type="success" class="button" @click="Register" round>注册</el-button>

                    </el-row>
                </el-form>
            </el-main>
            <el-footer><p>购物指南</p></el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data(){
            return{
                id:"",
                password:"",
                name:"",
                phone:"",
                email:"",
                status:"",
                password2:""
            }
        },
        methods:{
            Register(){
                //alert("您的用户名为："+this.userName)
                if(this.password!=this.password2){
                    alert("两次密码不一致");
                    return;
                }
                var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                var isok= reg.test(this.email );
                if (!isok) {
                    alert("邮箱格式不正确，请重新输入！");
                    return false;
                }
                var that = this;
                this.$myAxios.get('/ebook/addUser',{
                    params:{

                        password:this.password,
                        name:this.name,
                        phone:this.phone,
                        email:this.email,
                        status:that.status

                    }
                })
                    .then(function (response) {
                        console.log(response);
                        if(response.status=="200"){
                            if(response.data==-1){
                                alert("用户名已被占用,请您重新选择");
                                return;
                            }
                            alert("申请成功，您的账号id为"+response.data);
                            console.log(response.data.name);
                            that.$router.push({ path: `/login` });
                        }
                        else {alert("请您按照格式申请");}


                    })
                    .catch(function (error) {
                        console.log(error);
                        //alert("请您按照格式申请");


                    })
                    .then(function () {

                    });
            },
            toMain(){

                this.$router.push({ path: `/` });
            }
        }
    }
</script>

<style scoped>
    .input{
        margin:0px;
        width: 40%;
        left:30%;/**左边30%**/



    }
    .button{
        /**样式的名字 对应class=xxx**/
        width:40%;/**宽度**/

        position:relative;
        left:30%;/**左边50%**/

    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: left;
        line-height: 100%;
    }
</style>
