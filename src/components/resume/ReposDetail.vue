<template>
  <div class="container">
    <el-container>
      <el-aside width="15%">Aside</el-aside>
      <el-main>Main
        <p>{{repos.name}}</p>
      </el-main>
      <el-aside width="15%">Aside</el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'EmperorNiu',
      repos: {},
      reposIndex: 0
    }
  },
  created() {
    this.reposIndex = this.$route.query.reposIndex
    var repos = JSON.parse(sessionStorage.getItem('repos'))
    this.repos = repos[this.reposIndex]
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  // display: flex;
  // flex-direction: column;
  // background-image: url('../../assets/blue-snow.png');
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  // background-color: #D3DCE6;
  background-image: url('../../assets/blue-snow.png');
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-image: url("../../assets/so-white.png");
  // background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
