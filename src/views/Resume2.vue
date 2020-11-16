<template>
  <div class="resume-container">
    <!-- 标题 -->
    <div class="header">
      <div class="blank" style="width:10%"></div>
      <div class="logo">
        <img src="../assets/logo.png" style="height: 75px;width:120px">
      </div>
      <div class="top-input">
        <el-input
          placeholder="请输入内容"
          v-model="topInput" style="width:100%">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <div class="blank" style="width:45%;"></div>
      <div class="top-menu">
        <el-menu :default-active="menuActive" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
          <el-submenu index="/profile">
            <template slot="title">{{menuActive}}</template>
            <el-menu-item index="profile">Profile</el-menu-item>
            <el-menu-item index="languages">Language</el-menu-item>
            <el-menu-item index="repository">Repository</el-menu-item>
            <el-menu-item index="contributions">Contributions</el-menu-item>
            <el-menu-item index="relationship">Relationship</el-menu-item>
            <el-menu-item index="about">About</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <!-- <div class="title">{{ username }}'s Resume</div> -->
    </div>
    <div class="subtitle">{{ username }}'s Resume</div>
    <!-- <h1 style="text-align: center;">avoidLabelOverlap 's Resume</h1> -->
    <!-- <profile></profile> -->
    <div class="content" ref="content">
      <vue-page-transition name="fade-in-up">
        <router-view/>
      </vue-page-transition>
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
      circleUrl: '',
      page: '', // 用于同步
      repos: '', // 用于同步
      profile: '', // 用户基本信息
      menuActive: 'profile',
      changeActive: 0,
      topInput: '',
      subtitle: ['profile', 'languages', 'repository', 'contributions', 'relationship', 'about'],
      navList: [
        {
          id: 0,
          index: '/profile'
        },
        {
          id: 1,
          index: '/languages'
        },
        {
          id: 2,
          index: '/repository'
        },
        {
          id: 3,
          index: '/contributions'
        },
        {
          id: 4,
          index: '/relationship'
        },
        {
          id: 5,
          index: '/about'
        }
      ]
    }
  },
  // 获取数据
  created() {
    if (sessionStorage.getItem('activePage')) {
      this.changeActive = sessionStorage.getItem('activePage')
    }
    if (sessionStorage.getItem('activePath')) {
      this.menuActive = sessionStorage.getItem('activePath')
    }
    // this.username = this.$route.query.username
    // this.GetRepos()
    // this.GetStats()
    // this.GetOrg()
  },
  // 渲染页面
  mounted() {
    this.username = sessionStorage.getItem('username')
    this.$refs.content.addEventListener('mousewheel', this.handleScroll, false)
    // this.initDataAndChart()
    // this.initDataAndChart()
    // this.mytest()
  },
  updated() {
    sessionStorage.setItem('activePage', this.changeActive)
    sessionStorage.setItem('activePath', this.menuActive)
  },
  beforeDestroy() {
    sessionStorage.setItem('activePage', this.changeActive)
  },
  methods: {
    handleSelect(key, keyPath) {
      this.menuActive = keyPath[1]
      this.changeActive = this.subtitle.indexOf(keyPath[1])
      console.log(this.subtitle.indexOf(keyPath[1]))
    },
    handleScroll(e) {
      // 用来判断滚轮是向上滑动还是向下
      const direction = e.deltaY > 0 ? 'down' : 'up'
      const arrList = this.navList
      // 鼠标滚轮向下或后
      if (direction === 'down') {
        if (this.changeActive < arrList.length - 1) {
          // 选项卡激活的样式
          this.changeActive = this.changeActive + 1
          this.menuActive = this.subtitle[this.changeActive]
          // 跟随着选项卡而切换，以changeActive作为下标实现路由的path的读取
          this.$router.push({ path: arrList[this.changeActive].index })
        }
      } else {
        if (this.changeActive > 0) {
          this.changeActive = this.changeActive - 1
          this.menuActive = this.subtitle[this.changeActive]
          this.$router.push({ path: arrList[this.changeActive].index })
        }
      }
      sessionStorage.setItem('activePage', this.changeActive)
    }
  }
}
</script>

<style lang="less" scoped>
.resume-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  // background-image: url("../assets/blue-snow.png");
  background-color:#F9FAFB;
}
.header {
  width: 100%;
  height: 75px;
  background: #FFFFFF;
  box-shadow: 2px 2px 10px #909090;
  display: flex;
  flex-direction: row;
}
.top-input {
  margin-left: 25px;
  height: 75px;
  line-height:75px;
  text-align:center;
  width: 16%;
}
.top-menu {
  // width: 9%;
  line-height:75px;
}
.el-menu-demo {
  margin-top: 5px;
}
.el-input /deep/ .el-input__inner {
  background-color:#F6F8F9 !important;
}
.title {
  // width: 100%;
  height: 75px;
  font-size: 25px;
  font-weight: 400;
  margin-left: 110px;
  // text-align: center;
  line-height: 75px;
  color: #232F3C;
  // padding-top: 10px;
  // padding-bottom: 10px;
}
.subtitle {
  width: 100%;
  height: 70px;
  color: #475669;
  font-size: 28px;
  text-align: center;
  line-height: 70px;
  padding-top: 5px;
  padding-bottom: 5px;
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
  //font-weight: 5px;
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
  display: inline-block;
  text-align: right;
  margin-right: 25px;
}

.info-content {
  width: 450px;
  display: inline-block;
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
