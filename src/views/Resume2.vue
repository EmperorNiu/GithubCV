<template>
  <div class="resume-container">
    <!-- 标题 -->
    <div class="title">{{username}}'s Resume</div>
    <!-- <h1 style="text-align: center;">avoidLabelOverlap 's Resume</h1> -->
    <!-- <profile></profile> -->
    <div class="content">
      <router-view></router-view>
    </div>
    <!-- <el-carousel height="685px" direction="vertical" :autoplay="false">
      <el-carousel-item v-for="item in 3" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel> -->
  </div>
</template>

<script>
// import Profile from '../components/resume/Profile.vue'
export default {
  data() {
    return {
      screenHeight: 0,
      username: 'EmperorNiu',
      src: '',
      circleUrl: '',
      page: '', // 用于同步
      repos: '', // 用于同步
      orgs: '', // 用于同步
      profile: '', // 用户基本信息
      languages: {}, // 用户代码使用编程语言信息 形式（语言名 代码量）
      OrgList: [], // 用户组织信息 形式（组织图标，组织名）
      ReposDetails: [], // 仓库概述 形式（name fork star）
      languagesType: []
    }
  },
  // 获取数据
  created() {
    // this.username = this.$route.query.username
    // this.GetRepos()
    // this.GetStats()
    // this.GetOrg()
  },
  // 渲染页面
  mounted() {
    // this.initDataAndChart()
    // this.initDataAndChart()
    // this.mytest()
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.resume-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;;
  // background-color: rgb(189, 207, 223);
}
.title {
  width: 100%;
  height: 80px;
  font-size: 25px;
  text-align: center;
  line-height: 80px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.content {
  height: 100%;
}
// .block {
//   text-align: center;
//   height: 300px;
//   width: 300px;
// }
.section-left {
  width: 20%;
  font-size: 25px;
  font-weight: 5px;
}
.section-right {
  padding-left: 0;
  width: 75%;
  text-align: left;
}
.avatar {
  width: 20%;
  position: relative
}
.avatar-img {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -60px;
  margin-top: -60px;
}
.info-list {
  // display: flex;
  // flex-direction: column;
  margin-left: 20px;
  margin-top: 50px;
  li {
    // size: 10pxs;
    margin-bottom: 14px;
  }
}
.info-title {
  width: 150px;
  display:inline-block;
  text-align: right;
  margin-right: 25px;
}
.info-content {
  width: 450px;
  display:inline-block;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
