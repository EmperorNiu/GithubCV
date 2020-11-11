<template>
  <div>
    <el-card class="card">
      <div class="card-container">
        <div class="left-part">
          <div class="avatar">
            <el-avatar
              :size="150"
              :src="profile.avatar_url"
              class="avatar-img"
            ></el-avatar>
          </div>
          <div class="basic">
            <div class="nick-name">
              {{profile.login}}
            </div>
            <div class="location" v-if="profile.location != null">
              <i class="el-icon-location-information"></i>
              {{profile.location }}
            </div>
            <div class="location" v-if="profile.company != null">
              <i class="el-icon-office-building"></i>
              {{profile.company }}
            </div>
            <div class="location">
              <i class="el-icon-time"></i>
              {{ profile.created_at }} - {{ profile.updated_at }}
            </div>
          </div>
        </div>
        <div class="info-container">
          <div class="info-list">
            <div v-if="profile.name != null" class="info-item">
              <span v-if="profile.name != null" class="info-title">User Name:</span>
              <span v-if="profile.name != null" class="info-content">{{
                  profile.name
                }}</span>
            </div>
            <el-card class="info-card" shadow="hover">
              <div class="card-title">
                Statistics Overview:
              </div>
              <el-col :span="12">
                <el-row>
                  <div class="info-item">
                    <span class="info-title">Followers: </span>
                    <span class="info-content">{{ profile.followers }}</span>
                  </div>
                </el-row>
                <el-row>
                  <div class="info-item">
                    <span class="info-title">Following: </span>
                    <span class="info-content">{{ profile.following }}</span>
                  </div>
                </el-row>
                <el-row>
                  <div class="info-item">
                    <span class="info-title">Public Repository: </span>
                    <span class="info-content">{{ profile.public_repos }}</span>
                  </div>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <div class="info-item">
                    <span class="info-title">Total Stars: </span>
                    <span class="info-content">{{ allStar }}</span>
                  </div>
                </el-row>
                <el-row>
                  <div class="info-item">
                    <span class="info-title">Total Forks: </span>
                    <span class="info-content">{{ allFork }}</span>
                  </div>
                </el-row>
              </el-col>
            </el-card>
            <div class="info-item" v-if="profile.twitter_username != null">
              <span v-if="profile.twitter_username != null" class="info-title"
                >Twitter Username: </span>
              <span
                v-if="profile.twitter_username != null"
                class="info-content"
              >{{ profile.twitter_username }}</span>
            </div>
            <div class="info-item" v-if="profile.bio != null">
              <span v-if="profile.bio != null" class="info-title">Bio: </span>
              <span v-if="profile.bio != null" class="info-content">{{ profile.bio }}</span>
            </div>
            <el-divider style="width:80%"></el-divider>
            <el-card class="info-card" shadow="hover">
              <div class="card-title">
                Website:
              </div>
              <div class="info-item">
                <span class="info-title">GitHub Homepage: </span>
                <span class="info-content">
                  <el-link type="primary">{{ profile.html_url }}</el-link>
                </span>
              </div>
              <div class="info-item" v-if="profile.blog != null">
                <span v-if="profile.blog != null" class="info-title">Personal Homepage: </span>
                <span v-if="profile.blog != null" class="info-content">
                  <el-link type="primary">{{ profile.blog }}</el-link>
                </span>
              </div>
            </el-card>

          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'EmperorNiu',
      profile: {},
      allFork: 0,
      allStar: 0
    }
  },
  methods: {
    GetStats() {
      if (sessionStorage.getItem('profile')) {
        this.profile = JSON.parse(sessionStorage.getItem('profile'))
      } else {
        var url = 'https://api.github.com/users/' + this.username
        this.$http.get(url).then((result) => {
          // console.log(result)
          this.profile = result.data
          var ctime = new Date(result.data.created_at)
          ctime = ctime.getFullYear().toString() + '-' + (ctime.getMonth() + 1).toString()
          var utime = new Date(result.data.updated_at)
          utime = utime.getFullYear().toString() + '-' + (utime.getMonth() + 1).toString()
          this.profile.created_at = ctime
          this.profile.updated_at = utime
          sessionStorage.setItem('profile', JSON.stringify(this.profile))
        })
      }
    },
    getAllRepos() {
      var profile = JSON.parse(sessionStorage.getItem('profile'))
      var publicRepos = profile.public_repos
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
          this.profile.allStar = allStar
          this.profile.allFork = allFork
        })
      }
    }
  },
  created() {
    this.GetStats()
    this.allFork = sessionStorage.getItem('allFork')
    this.allStar = sessionStorage.getItem('allStar')
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/globalResume.css';

.left-part {
  width: 32%;
}
.avatar {
  width: 100%;
  text-align: center;
  margin-top: 25%;
  // height: 300px;
}
// .avatar-img {
//   margin: 0 auto
//   position: relative;
//   left: 50%;
//   top: 36%;
//   transform: translateY(-50%) translateX(-50%);
//   margin-left: -210px;
//   line-height: 500px;
//   margin-top: -210px;
// }
.nick-name {
  color: #132437;
  font-size: 26px;
  font-weight: 25;
  margin-top: 20px;
  margin-left: 28%;
}
.location {
  margin-left: 24%;
  font-size: 15px;
  color: #132437;
  margin-top: 4px;
}
.info-container {
  margin-left: 6%;
  width: 60%;
  height: 500px;
}
.info-list {
  height: auto;
  align-self: center;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.info-item {
  width: 100%;
  height: 40px;
  padding: 5px;
}
.info-card {
  width:65%;
  background-color:#fcfcfc27;
}
.card-title {
  margin-bottom: 15px;
  font-size: 18px;
  color: rgb(18, 0, 100);;
}
.info-title{
  font-weight: bold;
  color: rgb(34, 2, 177);
}
.info-content {
  margin-left: 10px;
}
</style>
