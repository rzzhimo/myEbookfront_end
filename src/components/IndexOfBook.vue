<template>
  <div class="hello">
    <el-container>
      <el-header>
        <el-row>

          <el-col :span="12"><el-button type="success" icon="el-icon-search" @click="searchChange">{{user}}</el-button></el-col>
          <el-col :span="12" align="right">
            <el-dropdown>

              <el-button type="primary" class="el-dropdown-link primary">下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item  class="button2"><el-row><el-button type="primary" @click="shopCar">购物车</el-button></el-row></el-dropdown-item>
                <el-dropdown-item  class="button2"  ><el-row><el-button type="primary" @click="myOrder">我的订单</el-button></el-row></el-dropdown-item>
                <el-dropdown-item  class="button2" ><el-row><el-button type="primary" @click="login">登录</el-button></el-row></el-dropdown-item>
                <el-dropdown-item  class="button2"><el-row><el-button type="primary" @click="Register">注册</el-button></el-row></el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
<!--            <el-button-group>-->
<!--            <el-button type="primary" class="button2"   @click="shopCar">购物车</el-button>-->
<!--            <el-button type="primary" class="button2"  @click="myOrder">我的订单</el-button>-->
<!--            <el-button type="primary" class="button2"  @click="login">登录</el-button>-->
<!--            <el-button type="primary" class="button2"  @click="Register">注册</el-button>-->

<!--            </el-button-group>-->
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="20%">
          <el-row>

            <el-col><el-input typeof="text" v-model="search" placeholder="请输入查询书籍" id="input1" @keyup.enter.native="searchChange"></el-input>


              <el-table :data="bookData.filter(data=>!search || data.title.includes(search))"
                        stripe
                        style="width: 100%" v-if="searchVisible==1">

                  <el-table-colum>
                  <el-table-column
                          prop="title"
                          label="书名"
                          sortable

                  >
                  </el-table-column>

                    <el-table-column>
                      <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="toBook(scope.row.book_id)">see it</el-button>
                      </template>
                    </el-table-column>
                  </el-table-colum>
              </el-table>
            </el-col>


          </el-row>

        </el-aside>
        <el-main>
          <el-row>
<!--            <el-carousel :interval="4000" type="card" arrow="always">-->
<!--              <el-carousel-item v-for="o in 6" :key="o">-->
<!--                <img :src="slidePic[o].images" alt="">-->
<!--              </el-carousel-item>-->
<!--            </el-carousel>-->
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="o in 6" :key="o">
                <img :src="slidePic[o].images" alt="" id="caimg">
              </el-carousel-item>
            </el-carousel>
          </el-row>
          <hr/>


          <el-row v-for="o in Math.floor((bookData.length)/3)" :key="o">
            <el-col :span="8">
              <el-row>
                <a @click="toBook(bookData[3*(o-1)].book_id)"><img :src=bookData[3*(o-1)].cover class="img-thumbnail book" ></a>
              </el-row>
              <el-row>
                <el-button type="text" @click="toBook(bookData[3*(o-1)].book_id)" id="book">{{bookData[3*(o-1)].title}}</el-button>

                <router-view/>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
                <a @click="toBook(bookData[3*(o-1)+1].book_id)"><img :src=bookData[3*(o-1)+1].cover class="img-thumbnail book"></a>
              </el-row>
              <el-row>
                <el-button type="text" @click="toBook(bookData[3*(o-1)+1].book_id)" id="book">{{bookData[3*(o-1)+1].title}}</el-button>

                <router-view/>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
                <a @click="toBook(bookData[3*(o-1)+2].book_id)"><img :src=bookData[3*(o-1)+2].cover class="img-thumbnail book"></a>
              </el-row>
              <el-row>
                <el-button type="text" @click="toBook(bookData[3*(o-1)+2].book_id)" id="book">{{bookData[3*(o-1)+2].title}}</el-button>

                <router-view/>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="bookData.length%3===1" :key="o" >
            <el-col :span="8">
              <el-row>
                <a @click="toBook(bookData[bookData.length-1].book_id)"><img :src=bookData[bookData.length-1].cover class="img-thumbnail book"></a>
              </el-row>
              <el-row>
                <el-button type="text"  @click="toBook(bookData[bookData.length-1].book_id)" id="book">{{bookData[bookData.length-1].title}}</el-button>

                <router-view/>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="bookData.length%3===2 && bookData.length>1" :key="o" >
            <el-col :span="8">
              <el-row>
                <a @click="toBook(bookData[bookData.length-2].book_id)"><img :src=bookData[bookData.length-2].cover class="img-thumbnail book"></a>
              </el-row>
              <el-row>
                <el-button type="text"  @click="toBook(bookData[bookData.length-2].book_id)" id="book">{{bookData[bookData.length-2].title}}</el-button>

                <router-view/>
              </el-row>
            </el-col>
            <el-col :span="8"  >
              <el-row>
                <a @click="toBook(bookData[bookData.length-1].book_id)"><img :src=bookData[bookData.length-1].cover class="img-thumbnail book"></a>
              </el-row>
              <el-row>
                <el-button type="text"  @click="toBook(bookData[bookData.length-1].book_id)" id="book">{{bookData[bookData.length-1].title}}</el-button>

                <router-view/>
              </el-row>
            </el-col>

          </el-row>






        </el-main>
      </el-container>

      <el-footer><p>购物指南</p></el-footer>

    </el-container>
  </div>
</template>

<script>
  // import https from '../https.js'

  export default {
  name: 'IndexOfBook',
  props: {
    msg: String
  },
  mounted(){
      this.loadBooks();
  },
  data(){
    return {
      slidePic:[{
        images:require("../assets/dazhe.jpg"),
         name:"hhh"
      },{
        images:require("../assets/dazhe2.jpg"),
          name:"hhh"
      },{
        images:require("../assets/dazhe3.jpg"),
          name:"hhh"
      },{
        images:require("../assets/dazhe4.jpg"),
          name:"hhh"
      },{
        images:require("../assets/dazhe5.jpg"),
          name:"hhh"
      },{
        images:require("../assets/dazhe2.jpg"),
          name:"hhh"
      },{
          images:require("../assets/dazhe4.jpg"),
          name:"hhh"
      }],
      inputBook:"",
      book:"",
      title:[],
      author:[],
      book_id:[],
      bookData:[],
      search:[],
      searchVisible:0,
      user:this.GLOBAL.name

    }
  },
  methods:{
    login(){
      this.$router.push({ path: `/login` });

    },

    Register(){
      this.$router.push({ path: `/Register` });
    },
    searchChange(){
      if(this.searchVisible==1){
            this.searchVisible=0;
      }else {
        this.searchVisible=1;
      }
    },
    shopCar(){
      this.$router.push({ path: `/shopCar` });
    },
    myOrder(){
      this.$router.push({ path: `/myOrder` });
    },
    loadBooks(){
      this.$myAxios.get('/ebook/allBooks')
              .then((response)=> {
                var that = this;
                for(var i=0;i<response.data.length;i++){
                  var objproject = {
                    "book_id" : response.data[i].book_id,//这个是赋值到一个数组对象里面去，开发的时候就是取到里面的值进行一个逻辑判断，要干嘛干嘛的。这个也加上他的下标
                    "title" : response.data[i].title,
                    "author" : response.data[i].author,
                    "language" : response.data[i].language,
                    "price" :response.data[i].price,
                    "stock" :response.data[i].stock,
                    "cover" : "data:image/png;base64," + response.data[i].cover.toString(),
                  }
                  that.bookData.push(objproject);
                  //console.log(response.data[i]);

                  //console.log(that.bookData[i].title);

                }
                this.$forceUpdate();//强制刷新

              })
              .catch(function (error) {
                console.log(error);  // 失败
              });
    },
    toBook(book_id){
         this.GLOBAL.book_id=book_id;

         console.log(this.GLOBAL.id);
         console.log(this.GLOBAL.book_id);
         this.$router.push({ path: `/book` });

    },


  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../mycss/IndexOfBook.css";

  .el-carousel__item:nth-child(2n) {
    width: 100%;
    height: 100%;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
