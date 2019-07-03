<template>
  <div class="home">

    <IndexOfBook msg="Welcome to Your Vue.js App"/>


  </div>
</template>

<script>
// @ is an alias to /src
import IndexOfBook from '@/components/IndexOfBook.vue'

export default {
  name: 'home',
  components: {
    IndexOfBook
  }
}
</script>
<style scoped>
/*.el-header, .el-footer {*/
    /*background-color: #B3C0D1;*/
    /*color: #333;*/
    /*text-align: center;*/
    /*line-height: 60px;*/
  /*}*/
  /**/
  /*.el-aside {*/
    /*background-color: #D3DCE6;*/
    /*color: #333;*/
    /*text-align: center;*/
    /*line-height: 200px;*/
  /*}*/
  /**/
  /*.el-main {*/
    /*background-color: #E9EEF3;*/
    /*color: #333;*/
    /*text-align: center;*/
    /*line-height: 160px;*/
  /*}*/
  /**/
  /*body > .el-container {*/
    /*margin-bottom: 40px;*/
  /*}*/
  /**/
  /*.el-container:nth-child(5) .el-aside,*/
  /*.el-container:nth-child(6) .el-aside {*/
    /*line-height: 260px;*/
  /*}*/
  /**/
  /*.el-container:nth-child(7) .el-aside {*/
    /*line-height: 320px;*/
  /*}*/
</style>
