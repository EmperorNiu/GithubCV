<template>
  <div class="resume-container">
    <!-- 标题 -->
    <h1 style="text-align: center;">{{username}}'s Resume</h1>
    <hr style="width:74%" />
    <!-- 头像+基本介绍 -->
    <div class="section" style="height: 400px">
      <!-- <div class="section-left">Basic Information</div> -->
      <div class="avatar">
         <el-avatar :size="150" :src="circleUrl" class="avatar-img"></el-avatar>
      </div>
      <div class="info-list">
        <ul style="list-style:none">
          <li v-if="profile.name != null" >
            <span v-if="profile.name != null" class="info-title">User Name: </span>
            <span v-if="profile.name != null" class="info-content">{{profile.name}}</span>
          </li>
          <li>
            <span class="info-title">Created Time:</span>
            <span class="info-content">{{profile.created_at}}</span>
          </li>
          <li>
            <span class="info-title">Update Time:</span>
            <span class="info-content">{{profile.updated_at}}</span>
          </li>
          <!-- <li>Stars Number: </li> -->
          <li>
            <span class="info-title">Followers: </span>
            <span class="info-content">{{profile.followers}}</span>
          </li>
          <li v-if="profile.company != null" >
            <span v-if="profile.company != null" class="info-title">Company: </span>
            <span v-if="profile.company != null" class="info-content">{{profile.company}}</span>
          </li>
          <li v-if="profile.location != null" >
            <span v-if="profile.location != null" class="info-title">Location: </span>
            <span v-if="profile.location != null" class="info-content">{{profile.location}}</span>
          </li>
          <li v-if="profile.twitter_username != null" >
            <span v-if="profile.twitter_username != null" class="info-title">Twitter Username: </span>
            <span v-if="profile.twitter_username != null" class="info-content">{{profile.twitter_username}}</span>
          </li>
          <li v-if="profile.bio != null" >
            <span v-if="profile.bio != null" class="info-title">Bio: </span>
            <span v-if="profile.bio != null" class="info-content">{{profile.bio}}</span>
          </li>
        </ul>
      </div>
    </div>
    <hr style="width:74%" />
    <!-- 主页 -->
    <div v-if="profile.blog != ''" class="section" style="height: 200px;line-height: 200px;">
      <div v-if="profile.blog != ''" class="section-left">个人主页</div>
      <div v-if="profile.blog != ''" class="section-right">
        <a v-bind:href="profile.blog">{{profile.blog}}</a>
      </div>
    </div>
    <hr v-if="profile.blog != ''" style="width:74%" />
    <!-- 各语言占比 -->
    <div class="section" style="height: 500px;line-height: 500px;">
      <div class="section-left">Languages</div>
      <div class="section-right">
        <div ref="language_pie" style="height:500px;"></div>
      </div>
    </div>
    <hr style="width:74%" />
    <!-- 项目展示 -->
    <div class="section" style="height: 400px;line-height: 400px;">
      <div class="section-left" style="font-size: 20px;">Repositories</div>
      <div class="section-right">
      </div>
    </div>
    <hr style="width:74%" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
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
    this.username = this.$route.query.username
    // this.GetRepos()
    // this.GetStats()
    // this.GetOrg()
  },
  // 渲染页面
  mounted() {
    this.initDataAndChart()
    // this.initDataAndChart()
    // this.mytest()
  },
  methods: {
    initDataAndChart() {
      var chart = this.$echarts.init(this.$refs.language_pie)
      // chart.showLoading()
      this.$http.get('repos/languages?username=' + this.username).then((result) => {
        var languageData = result.data
        // chart.hideLoadinig()
        console.log(languageData)
        this.drawChart(chart, languageData)
      })
    },
    mytest() {
      console.log(this.tmp)
      // console.log(this.)
      // console.log(this.languages["Go"])
      // var length = JSON.stringify(this.languages)
      // console.log(length)
    },
    drawChart(chart, languageData) {
      // 准备数据
      var option = {
        title: {
          text: '所有项目编程语言分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: languageData.keyList
        },
        series: [
          {
            name: 'languages',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '25',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: languageData.response
          }
        ]
      }
      chart.setOption(option)
    },
    setLanguagePieOptions() {
      // var dataValue = []
      // for (var i = 0; i < this.languagesType.length; i++) {
      //   dataValue.push({
      //     value: this.languages[this.languagesType[i]],
      //     name: this.languagesType[i]
      //   })
      // }
      // console.log(dataValue)
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: this.languagesType
        },
        series: [
          {
            name: 'languages',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '25',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.languages
          }
        ]
      })
    },
    GetStats() {
      var url = 'https://api.github.com/users/' + this.username
      this.$http.get(url).then((result) => {
        // console.log(result)
        this.profile = result.data
        this.circleUrl = this.profile.avatar_url
      })
    },
    GetRepos() {
      var url = 'https://api.github.com/users/' + this.username
      this.$http.get(url).then((result) => {
        this.page = Math.floor(result.data.public_repos / 100) + 1
        // var dataValue = []
        for (var $i = 1; $i <= this.page; $i++) {
          url = 'https://api.github.com/users/' + this.username + '/repos' + '?per_page=100' + '&page=' + $i
          this.$http.get(url).then((result) => {
            // this.repos = result.data
            var repos = result.data
            var length = result.data.length
            var languages = []
            // var languageNum = 0
            for (var $j = 0; $j < length; $j++) {
              if (repos[$j].language != null && repos[$j].fork === false) {
                var ctime = new Date(repos[$j].created_at)
                var utime = new Date(repos[$j].pushed_at)
                this.ReposDetails.push({
                  name: repos[$j].name,
                  language: repos[$j].language,
                  forks: repos[$j].forks_count,
                  stars: repos[$j].stargazers_count,
                  html: repos[$j].html_url,
                  created_at: ctime.getFullYear().toString() + '.' + (ctime.getMonth() + 1).toString(),
                  updated_at: utime.getFullYear().toString() + '.' + (utime.getMonth() + 1).toString()
                })
                url = 'https://api.github.com/repos/' + repos[$j].full_name + '/languages'
                this.$http.get(url).then((result) => {
                  for (var lang in result.data) {
                    if (lang in this.languages) {
                      languages[lang] = languages[lang] + result.data[lang]
                    } else {
                      languages[lang] = result.data[lang]
                    }
                  }
                })
              }
            }
          })
        }
      })
    },
    GetOrg() {
      var url = 'https://api.github.com/users/' + this.username + '/orgs'
      this.$http.get(url).then((result) => {
        var length = result.data.length
        this.orgs = result.data
        // console.log(length)
        for (var $j = 0; $j < length; $j++) {
          url = 'https://api.github.com/orgs/' + this.orgs[$j].login
          // console.log(url)
          this.$http.get(url).then((NameResult) => {
            if (NameResult.data.name && NameResult.data.name != null) {
              this.OrgList.push({ name: NameResult.data.name, icon: NameResult.data.avatar_url })
            } else {
              this.OrgList.push({ name: NameResult.data.login, icon: NameResult.data.avatar_url })
            }
          })
        }
      })
      console.log(this.OrgList)
    },
    GetLanguages(url) {
      var languages = {}
      // var languageNum = 0
      this.$http.get(url).then((result) => {
        for (var lang in result.data) {
          if (lang in this.languages) {
            languages[lang] = languages[lang] + result.data[lang]
          } else {
            languages[lang] = result.data[lang]
            // languageNum += 1
          }
        }
      })
      return languages
    }
  }
}
</script>

<style lang="less" scoped>
.resume-container {
  height: auto;
  // background-color: rgb(189, 207, 223);
}
// .block {
//   text-align: center;
//   height: 300px;
//   width: 300px;
// }
.section {
  display: flex;
  flex-direction: row;
  margin-left: 13%;
  margin-right: 13%;
}
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
    // margin-bottom: 14px;
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
</style>
