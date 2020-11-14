<template>
  <div class="container">
    <div class="loading-container" v-if="progressLoading">
      <el-progress
        class="loading"
        :text-inside="true"
        :stroke-width="26"
        :percentage="percentage"
        :show-text="false"
      ></el-progress>
    </div>
    <el-button @click="stop">Stop</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentage: 50,
      progressLoading: false,
      loading: false,
      repos: [],
      profile: {},
      username: ''
    }
  },
  mounted() {
    this.username = this.$route.query.username
    console.log(this.username)
    this.loading = true
    this.loadData()
    // const loading = this.$loading({
    //   lock: true,
    //   text: 'Loading',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.7)'
    // })
    // setTimeout(() => {
    //   loading.close()
    // }, 2000)
  },
  methods: {
    loadData() {
      var url = '/githubUser/init?username=' + this.username
      this.$http.get(url).then((result) => {
        var data = result.data
        sessionStorage.setItem('profile', JSON.stringify(data.profile))
        sessionStorage.setItem('repos', JSON.stringify(data.repos))
        sessionStorage.setItem('contribution', JSON.stringify(data.contributions))
        sessionStorage.setItem('allStar', JSON.stringify(data.all_fork))
        sessionStorage.setItem('allFork', JSON.stringify(data.all_star))
        var languages = {
          keyList: data.language_key,
          percent: data.language_percent
        }
        sessionStorage.setItem('languages', JSON.stringify(languages))
        this.loading = false
      })
    },
    async GetStats() {
      var url = 'https://api.github.com/users/' + this.username
      this.$http.get(url).then(async (result) => {
        this.profile = result.data
        var ctime = new Date(result.data.created_at)
        ctime = ctime.getFullYear().toString() + '-' + (ctime.getMonth() + 1).toString()
        var utime = new Date(result.data.updated_at)
        utime = utime.getFullYear().toString() + '-' + (utime.getMonth() + 1).toString()
        this.profile.created_at = ctime
        this.profile.updated_at = utime
        sessionStorage.setItem('profile', JSON.stringify(this.profile))
        await this.getAllRepos(result.data.public_repos)
        this.loading = false
      })
    },
    async getAllRepos(publicRepos) {
      console.log(789)
      console.log(publicRepos)
      var pageNum = Math.floor(publicRepos / 100) + 1
      var allStar = 0
      var allFork = 0
      for (var $i = 1; $i <= pageNum; $i++) {
        var url =
          'https://api.github.com/users/' +
          this.username +
          '/repos' +
          '?per_page=100' +
          '&page=' +
          $i
        this.$http.get(url).then((result) => {
          console.log(963)
          var repos = result.data
          for (var $j = 0; $j < repos.length; $j++) {
            if (repos[$j].language != null && repos[$j].fork === false) {
              var ctime = new Date(repos[$j].created_at)
              var utime = new Date(repos[$j].pushed_at)
              allStar += repos[$j].stargazers_count
              allFork += repos[$j].forks_count
              this.repos.push({
                name: repos[$j].name,
                language: repos[$j].language,
                forks: repos[$j].forks_count,
                stars: repos[$j].stargazers_count,
                html: repos[$j].html_url,
                description: repos[$j].description,
                open_issue: repos[$j].open_issues_count,
                homepage: repos[$j].homepage,
                created_at:
                  ctime.getFullYear().toString() +
                  '.' +
                  (ctime.getMonth() + 1).toString(),
                updated_at:
                  utime.getFullYear().toString() +
                  '.' +
                  (utime.getMonth() + 1).toString()
              })
            }
          }
          sessionStorage.setItem('repos', JSON.stringify(this.repos))
          sessionStorage.setItem('allStar', JSON.stringify(allStar))
          sessionStorage.setItem('allFork', JSON.stringify(allFork))
        })
      }
    },
    // 进度条开始
    start() {
      // const this = this
      // this.fatherHeight = this.$el.parentNode.offsetHeight
      this.$nextTick(() => {
        this.progressLoading = true
        this.percentage = 0
        this.timeStart = setInterval(() => {
          if (this.percentage < 96) {
            this.percentage += 0.4
          }
        }, 50)
      })
    },
    // 进度条结束
    end() {
      this.percentage = 100
      clearInterval(this.timeStart)
      setTimeout(() => {
        this.progressLoading = false
      }, 300)
      this.$router.push('/resume2')
    },
    stop() {
      this.loading = false
    }
  },
  watch: {
    // 监听loading状态控制进度条显示
    async loading(value, newValue) {
      console.log(value)
      const that = this
      if (value) {
        that.start()
      } else {
        that.end()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
}
.loading-container {
  width: 76%;
  height: 100%;
  margin-left: 12%;
}
.loading {
  padding-top: 25%;
}
</style>
