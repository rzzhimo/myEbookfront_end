<template>
    <div class="Table">
        <el-container>
            <el-header>
                <el-row>
                    <el-button type="danger" width="30%"
                               position="relative" @click="toMain">全部商品分类</el-button>



                    <el-button type="danger" width="30%"
                               position="relative" @click="beginAdd">增加书籍</el-button>
                    <el-button type="danger" width="30%"
                               position="relative" @click="touserManager">管理用户</el-button>
                    <el-button type="danger" width="30%"
                               position="relative" @click="toorderManager">管理订单</el-button>
                    <el-dialog
                            title="编辑新增的书籍信息"
                            :visible.sync="addVisible"
                            width="50%"

                    >
                        <!--<el-row>-->
                        <!--<el-col ><a><img src="../assets/weilai.jpeg" class="img-thumbnail book2"></a></el-col>-->
                        <!--</el-row>-->
                        <el-row>编码:   <el-input placeholder="新的ISBN编码" v-model="newBook_id" class="input" style="left: auto"></el-input></el-row>
                        <el-row>书名:   <el-input placeholder="新的书名" v-model="newTitle" class="input" style="left: auto"></el-input></el-row>
                        <el-row>作者:   <el-input placeholder="新的作者" v-model="newAuthor" class="input" style="left: auto"></el-input></el-row>
                        <el-row>语言:   <el-input placeholder="新的语言" v-model="newLanguage" class="input" style="left: auto"></el-input></el-row>
                        <el-row>价格:   <el-input placeholder="新的价格" v-model="newPrice" class="input" style="left: auto"></el-input></el-row>
                        <el-row>库存:   <el-input placeholder="新的库存" v-model="newStock" class="input" style="left: auto"></el-input></el-row>
<!--                        <el-row>-->
<!--                            图片: <el-upload-->
<!--                                action="https://jsonplaceholder.typicode.com/posts/"-->

<!--                                list-type="picture-card"-->
<!--                                :on-preview="handlePictureCardPreview"-->
<!--                                :on-remove="handleRemove">-->
<!--                            <i class="el-icon-plus"></i>-->
<!--                        </el-upload>-->

<!--                            <el-dialog :visible.sync="dialogVisible">-->
<!--                                <img width="100%" :src="dialogImageUrl" alt="">-->
<!--                            </el-dialog>-->
<!--                        </el-row>-->
                        <el-row>
                            <span><label>封面: </label></span>
                            <span><input type='file' accept="image/*" id="file" ref="file"></span>
                        </el-row>
                        <span slot="footer" class="dialog-footer">

                            <el-button-group>
                                <el-button @click="addVisible = false">取 消</el-button>
                                <el-button type="danger" @click="handleAdd ">确 定</el-button>
                            </el-button-group>
                            </span>
                    </el-dialog>
                </el-row>

            </el-header>
            <el-main>
                <el-row>
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
                        <el-input v-model="value3" style="width: 30%"
                                  placeholder="请输入要查询销量的ISBN编码" prefix-icon="el-icon-search"/>
                        <el-button type="danger" @click="searchBookSale(value1,value2,value3)">开始查询</el-button>
                    </div>
                </el-row>
        <el-input v-model="search" style="width: 30%"
                  placeholder="请输入搜索的书名" prefix-icon="el-icon-search"/>

        <el-table :data="bookData.filter(data=>!search || data.title.includes(search))"
                  stripe
                  style="width: 100%">
            <el-table-column>
                <!--<template slot="header"  scope="scope" >-->
                <!--<el-input v-model="search" style="width: 300px"-->
                <!--placeholder="请输入书名" prefix-icon="el-icon-search"/>-->
                <!--</template>-->
                <el-table-column
                        prop="book_id"
                        label="ISBN编号"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="书名"
                        sortable
                ></el-table-column>
                <el-table-column
                        prop="author"
                        label="作者"
                        sortable
                ></el-table-column>
                <el-table-column
                        prop="language"
                        label="语言"
                        sortable
                ></el-table-column>
                <el-table-column
                        prop="price"
                        label="价格"
                        sortable
                ></el-table-column>
                <el-table-column
                        prop="stock"
                        label="库存"
                        sortable
                ></el-table-column>
                <el-table-column
                        align="right">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="beginEdit(scope.$book_id, scope.row)">Edit</el-button>
                        <el-dialog
                                title="编辑书籍信息"
                                :visible.sync="editVisible"
                                width="50%"

                        >
                            <!--<el-row>-->
                                <!--<el-col ><a><img src="../assets/weilai.jpeg" class="img-thumbnail book2"></a></el-col>-->
                            <!--</el-row>-->
                            <el-row>ISBN编码:   <el-input placeholder="新的ISBN编码" v-model="newBook_id" class="input" style="left: auto"></el-input></el-row>
                            <el-row>书名:   <el-input placeholder="新的书名" v-model="newTitle" class="input" style="left: auto"></el-input></el-row>
                            <el-row>作者:   <el-input placeholder="新的作者" v-model="newAuthor" class="input" style="left: auto"></el-input></el-row>

                            <el-row>价格:   <el-input placeholder="新的价格" v-model="newPrice" class="input" style="left: auto"></el-input></el-row>
                            <el-row>库存:   <el-input placeholder="新的库存" v-model="newStock" class="input" style="left: auto"></el-input></el-row>

                                                <span slot="footer" class="dialog-footer">

                            <el-button-group>
                                <el-button @click="editVisible = false">取 消</el-button>
                                <el-button type="danger" @click="handleEdit (scope.$book_id, scope.row)">确 定</el-button>
                            </el-button-group>
                            </span>
                        </el-dialog>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$book_id, scope.row)">Delete</el-button>
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
        name: 'Table',
        data () {
            return {
                search: '',

                bookData:[],
                addVisible:false,
                editVisible:false,
                newBook_id:null,
                newAuthor:"",
                newTitle:"",
                newLanguage:"Chinese",
                newPrice:"",
                newStock:1,
                newPic:null,//用来存图片的
                cover:"",
                dialogImageUrl: '',
                dialogVisible: false,
                value1:'',
                value2:'',
                value3:null,

            }
        },
        mounted(){
            this.loadBook();
        },
        methods: {
            beginAdd(){
                this.addVisible=true;
            },
            handleAdd(){
                // var that = this;
                // this.addVisible=false;
                // this.$myAxios.get('/ebook/addBook',{
                //     params:{
                //         book_id:that.newBook_id,
                //         title:that.newTitle,
                //         author:that.newAuthor,
                //         language:that.newLanguage,
                //         price:that.newPrice,
                //         stock:that.newStock
                //     }
                // })
                //     .then(function (response) {
                //         console.log(response);
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     })
                //     .then(function () {
                //         //always executed
                //         that.bookData=[];
                //         that.$options.methods.loadBook.bind(that)();
                //     })


                let imagFile = this.$refs.file.files[0];

                var that = this;
                this.addVisible=false;
                let bodyFormData = new FormData();
                bodyFormData.set('book_id', that.newBook_id);
                bodyFormData.set('title', that.newTitle);
                bodyFormData.set('author', that.newAuthor);
                bodyFormData.set('language', that.newLanguage);
                bodyFormData.set('price', that.newPrice);
                bodyFormData.set('stock', that.newStock);
                bodyFormData.append('cover',imagFile);
                that.$myAxios({method: 'post',
                    url: '/ebook/addBook',
                    data: bodyFormData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}}
                )
                    .then(function (response) {
                        console.log(response);
                        if(response.data){alert("添加书籍成功");}
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function () {
                        //always executed
                        that.bookData=[];
                        that.$options.methods.loadBook.bind(that)();
                    });
            },
            beginEdit(book_id, row){
                this.editVisible = true;
                this.newBook_id = row.book_id;
                this.newTitle = row.title;
                this.newAuthor = row.author;


                this.newPrice = row.price;
                this.newStock = row.stock;

            },
            handleEdit (book_id, row) {
                var that = this;
                this.editVisible = false;
                console.log(row.book_id,row.author, row.title, row.language, row.price, row.stock)
                this.$myAxios.get('/ebook/editBook',{
                    params:{
                        book_id:this.newBook_id,
                        title:this.newTitle,
                        author:this.newAuthor,
                        price:this.newPrice,
                        stock:this.newStock
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
                        that.newBook_id = null;
                        that.newTitle = null;
                        that.newAuthor = null;


                        that.newPrice = null;
                        that.newStock = null;
                        that.bookData=[];
                        that.$options.methods.loadBook.bind(that)();
                    })
            },
            handleDelete (book_id, row) {
                //alert(row.title+"还未实现")
                var that = this;
                this.editVisible = false;
                console.log(row.book_id,row.author, row.title, row.language, row.price, row.stock)
                this.$myAxios.get('/ebook/deleteBook',{
                    params:{
                        book_id:row.book_id,

                    }
                })
                    .then(function (response) {
                        console.log(response);
                        if(response.data=="删除成功"){alert("删除成功");}
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function () {
                        //always executed
                        that.bookData=[];
                        that.$options.methods.loadBook.bind(that)();
                    })
            },
            toMain(){
                this.$router.push({ path: `/` });
            },
            touserManager(){
                this.$router.push({ path: `/userManager` });
            },
            toorderManager(){this.$router.push({ path: `/orderManager` });},
            loadBook:function () {
                var that = this;
                this.$myAxios.get('/ebook/allBooks')
                    .then((response)=> {
                        for(var i=0;i<response.data.length;i++){
                              var objproject = {
                                  "book_id" : response.data[i].book_id,//这个是赋值到一个数组对象里面去，开发的时候就是取到里面的值进行一个逻辑判断，要干嘛干嘛的。这个也加上他的下标
                                  "title" : response.data[i].title,
                                  "author" : response.data[i].author,
                                  "language" : response.data[i].language,
                                  "price" :response.data[i].price,
                                  "stock" :response.data[i].stock
                            }
                              that.bookData.push(objproject);
                              //console.log(that.bookData[i]);

                             //console.log(that.bookData[i].title);

                        }
                        this.$forceUpdate();//强制刷新

                    })
                    .catch(function (error) {
                        console.log(error);  // 失败
                    });
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
                return file;
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;

            },
            searchBookSale:function (value1,value2,value3) {

                this.$myAxios.get('/ebook/searchBookSale',{
                    params:{
                        book_id:value3,
                        start:value1.toString(),
                        end:value2.toString(),

                    }
                })
                    .then((response)=> {
                        // for(var i=0;i<response.data.length;i++){
                        //     var objproject = {
                        //         "book_id" : response.data[i].book_id,//这个是赋值到一个数组对象里面去，开发的时候就是取到里面的值进行一个逻辑判断，要干嘛干嘛的。这个也加上他的下标
                        //         "title" : response.data[i].title,
                        //         "author" : response.data[i].author,
                        //         "language" : response.data[i].language,
                        //         "price" :response.data[i].price,
                        //         "stock" :response.data[i].stock
                        //     }
                        //     that.bookData.push(objproject);
                        //     //console.log(that.bookData[i]);
                        //
                        //     //console.log(that.bookData[i].title);
                        //
                        // }
                        alert("该书籍的销量为"+response.data);


                    })
                    .catch(function (error) {
                        console.log(error);  // 失败
                    });
        }
        }
    }
</script>

<style scoped>

</style>
