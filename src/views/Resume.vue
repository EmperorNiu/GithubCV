<template>
  <div style="text-align: center;">
    <!-- 标题 -->
    <h1>{{username}}'s Resume</h1>
    <hr style="width:74%" />
    <!-- 基本介绍 -->
    <div class="section" style="height: 300px">
      <!-- <div class="section-left">Basic Information</div> -->
      <div class="avatar">
         <el-avatar :size="120" :src="circleUrl" class="avatar-img"></el-avatar>
      </div>
      <div class="info-list">
        <ul>
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
          <li>Stars Number: </li>
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
    <!--  -->
    <div v-if="profile.blog != ''" class="section" style="height: 200px;line-height: 200px;">
      <div v-if="profile.blog != ''" class="section-left">个人主页</div>
      <div v-if="profile.blog != ''" class="section-right">
        <a v-bind:href="profile.blog">{{profile.blog}}</a>
      </div>
    </div>
    <hr v-if="profile.blog != ''" style="width:74%" />

    <div class="section" style="height: 400px;line-height: 400px;">
      <div class="section-left">Languages</div>
      <div class="section-right">
        <div id="my_chart" style="height:400px;"></div>
      </div>
    </div>
    <hr style="width:74%" />
    <div class="section" style="height: 400px;line-height: 400px;">
      <div class="section-left" style="font-size: 20px;">Popular Repositories</div>
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
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      page: '', // 用于同步
      repo: '', // 用于同步
      orgs: '', // 用于同步
      profile: '', // 用户基本信息
      languages: {}, // 用户代码使用编程语言信息 形式（语言名 代码量）
      OrgList: [], // 用户组织信息 形式（组织图标，组织名）
      ReposDetails: []
    }
  },
  mounted() {
    this.username = this.$route.query.username
    this.GetStats()
    this.initCharts()
    this.GetLang()
    this.GetOrg()
  },
  methods: {
    initCharts() {
      var echarts = require('echarts/dist/echarts.common.js')
      // 引入柱状图
      // require('echarts/lib/chart/bar')
      // 引入提示框和标题组件
      // require('echarts/lib/component/tooltip')
      // require('echarts/lib/component/title')
      this.chart = echarts.init(document.getElementById('my_chart'))
      this.setOptions()
    },
    setOptions() {
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['Python', 'JavaScript', 'C++', 'Golang', 'JupyterNotebook']
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
            data: [
              { value: 335, name: 'Python' },
              { value: 310, name: 'JavaScript' },
              { value: 234, name: 'C++' },
              { value: 135, name: 'Golang' },
              { value: 1548, name: 'JupyterNotebook' }
            ]
          }
        ]
      })
    },
    GetStats() {
      var url = 'https://api.github.com/users/' + this.username + '?access_token='
      this.$http.get(url).then((result) => {
        this.profile = result.data
      })
    },
    GetLang() {
      var url = 'https://api.github.com/users/' + this.username + '?access_token='
      this.$http.get(url).then((result) => {
        this.page = Math.floor(result.data.public_repos / 100) + 1
        // console.log(this.page)
        for (var $i = 1; $i <= this.page; $i++) {
          url = 'https://api.github.com/users/' + this.username + '/repos' + '?per_page=100' + '&page=' + $i + '&access_token='
          // console.log(url)
          this.$http.get(url).then((result) => {
            this.repo = result.data
            var length = result.data.length
            // console.log(length)
            for (var $j = 0; $j < length; $j++) {
              if (this.repo[$j].language != null && this.repo[$j].fork === false) {
                this.ReposDetails.push({ name: this.repo[$j].name, forks: this.repo[$j].forks_count, stars: this.repo[$j].stargazers_count })
                url = 'https://api.github.com/repos/' + this.repo[$j].full_name + '/languages?access_token='
                // console.log(url)
                this.$http.get(url).then((result) => {
                  // console.log(result.data)
                  for (var lang in result.data) {
                    if (lang in this.languages) {
                      this.languages[lang] = this.languages[lang] + result.data[lang]
                    } else {
                      this.languages[lang] = result.data[lang]
                    }
                    // console.log(lang)
                  }
                })
              }
            }
            // console.log(this.languages)
          })
        }
        console.log(this.ReposDetails)
        console.log(this.languages)
      })
    },
    GetOrg() {
      var url = 'https://api.github.com/users/' + this.username + '/orgs' + '?access_token='
      this.$http.get(url).then((result) => {
        var length = result.data.length
        this.orgs = result.data
        // console.log(length)
        for (var $j = 0; $j < length; $j++) {
          url = 'https://api.github.com/orgs/' + this.orgs[$j].login + '?access_token='
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
    }
  }
}
</script>

<style lang="less" scoped>
.block {
  text-align: center;
  height: 300px;
  width: 300px;
}
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
    margin-bottom: 10px;
  }
}
</style>
