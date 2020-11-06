<template>
  <div class="resume-container">
    <!-- 标题 -->
    <div class="title">{{ username }}'s Resume</div>
    <div class="subtitle">{{ subtitle[changeActive] }}</div>
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
      changeActive: 0,
      subtitle: ['Profile', 'Language Percent', 'Repository', 'Contributions', 'Relationship', 'About'],
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
    this.changeActive = sessionStorage.getItem('activePage')
    // this.username = this.$route.query.username
    // this.GetRepos()
    // this.GetStats()
    // this.GetOrg()
  },
  // 渲染页面
  mounted() {
    this.$refs.content.addEventListener('mousewheel', this.handleScroll, false)
    // this.initDataAndChart()
    // this.initDataAndChart()
    // this.mytest()
  },
  beforeDestroy() {
    sessionStorage.setItem('activePage', this.changeActive)
  },
  methods: {
    handleScroll(e) {
      // 用来判断滚轮是向上滑动还是向下
      const direction = e.deltaY > 0 ? 'down' : 'up'
      const arrList = this.navList
      // 鼠标滚轮向下或后
      if (direction === 'down') {
        if (this.changeActive < arrList.length - 1) {
          // 选项卡激活的样式
          this.changeActive = this.changeActive + 1
          // 跟随着选项卡而切换，以changeActive作为下标实现路由的path的读取
          this.$router.push({ path: arrList[this.changeActive].index })
        }
      } else {
        if (this.changeActive > 0) {
          this.changeActive = this.changeActive - 1
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
  background-image: url("../assets/blue-snow.png");
  // background-color: rgb(189, 207, 223);
}

.title {
  width: 100%;
  height: 70px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  line-height: 70px;
  // padding-top: 10px;
  // padding-bottom: 10px;
}
.subtitle {
  width: 100%;
  height: 50px;
  color: #475669;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  padding-top: 8px;
  padding-bottom: 8px;
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
