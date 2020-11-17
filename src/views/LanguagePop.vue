<template>
  <div class='container'>
    <el-container>
      <el-aside width='15%'></el-aside>
      <el-main>
        <div class='container'>
          <el-page-header @back='goBack' content='Language Popularity' title='back'>
          </el-page-header>
          <!-- 项目标题 -->
          <div class='repos-title'>
            Language Popularity
          </div>
          <!-- 项目内容 -->
          <div class='repos-content'>
            <div class='item'>
              <el-row>
                <el-col :span="16"><div class='item-title'>Programming Language Rank</div></el-col>
              </el-row>
              <div class="item-content">
                <div><language-rank></language-rank></div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
      <el-aside width='15%'></el-aside>
    </el-container>
  </div>
</template>

<script>
import languageRank from '../components/repos/languageRank.vue'

export default {
  data() {
    return {
      username: '',
      activitise: '0'
    }
  },
  components: {
    languageRank: languageRank
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  mounted() {
  },
  created() {
    this.username = sessionStorage.getItem('username')
  }
}
</script>

<style lang='less' scoped>
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
  background-image: url('../assets/blue-snow.png');
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-image: url('../assets/so-white.png');
  // background-color: #E9EEF3;
  color: #333;
  text-align: center;
  // line-height: 160px;
}
.repos-title {
  font-size: 28px;
  height: 90px;
  line-height: 90px;
}
.time-card {
  height: 100px;
  // width: 550px;
}
.item {
  width: 100%;
  height: 530px;
  display: flex;
  flex-direction: column;
}
.item-title {
  width: 400px;
  font-size: 20px;
  height: 55px;
  line-height: 60px;
}
.item-content {
  margin-left: 70px;
  margin-top: 10px;
}
</style>
