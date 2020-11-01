<template>
  <div>
    <el-card class="card">
      <div class="card-container">
        <el-carousel type="card" indicator-position="outside" class="carousel" height="430px" @change="carouselChange">
          <el-carousel-item v-for="item in repos.length" :key="item" :autoplay="false" trigger="click">
            <div class="title">
              <el-button type="text" style="font-size:25px;" @click="detail">
                <span>{{repos[item-1].name}}</span><i class="el-icon-view el-icon--right"></i>
              </el-button>
            </div>
            <div class="info-list">
              <div class="info-item">
                <span class="info-title">Project Maintenance Time:  </span>
                <span class="info-content"
                  >{{ repos[item-1].created_at }} - {{ repos[item-1].updated_at }}</span
                >
              </div>
              <div class="info-item" v-if="repos[item-1].description != null && repos[item-1].description != ''">
                <span class="info-title">Description:  </span>
                <span class="info-content" style="font-size: 16px;">{{ repos[item-1].description }}</span>
              </div>
              <div class="info-item">
                <span class="info-title">Main Languages:  </span>
                <span class="info-content">{{ repos[item-1].language }}</span>
              </div>
              <div class="info-item">
                <span class="info-title">Stars Num:  </span>
                <span class="info-content">{{
                  repos[item-1].stars
                }}</span>
              </div>
              <div class="info-item">
                <span class="info-title">Forks Num:  </span>
                <span class="info-content">{{ repos[item-1].forks }}</span>
              </div>
              <div class="info-item" v-if="repos[item-1].homepage != null && repos[item-1].homepage != ''">
                <span class="info-title">Homepage:  </span>
                <span class="info-content">{{ repos[item-1].homepage }}</span>
              </div>
              <div class="info-item">
                <span class="info-title">Link:  </span>
                <span class="info-content">{{ repos[item-1].html }}</span>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
        <!-- <div class="section-left">
          {{ repos[0].name }}
        </div>
        <div class="section-right">
          <div class="info-list">
            <div class="info-item">
              <span class="info-title">Time: </span>
              <span class="info-content"
                >{{ repos[0].created_at }} - {{ repos[0].updated_at }}</span
              >
            </div>
            <div class="info-item">
              <span class="info-title">Stars: </span>
              <span class="info-content">{{
                repos[0].stars
              }}</span>
            </div>
            <div class="info-item">
              <span class="info-title">Languages: </span>
              <span class="info-content">{{ repos[0].language }}</span>
            </div>
            <div class="info-item">
              <span class="info-title">Forks: </span>
              <span class="info-content">{{ repos[0].forks }}</span>
            </div>
            <div class="info-item">
              <span class="info-title">Link: </span>
              <span class="info-content">{{ repos[0].html }}</span>
            </div>
          </div>
        </div> -->
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'EmperorNiu',
      repos: [],
      active: 0
    }
  },
  methods: {
    getAllRepos() {
      var profile = JSON.parse(sessionStorage.getItem('profile'))
      var publicRepos = profile.public_repos
      var pageNum = Math.floor(publicRepos / 100) + 1
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
        })
      }
    },
    detail() {
      this.$router.push({
        path: '/reposDetail',
        query: {
          reposIndex: this.active
        }
      })
    },
    carouselChange(key1, key2) {
      this.active = key1
    }
  },
  created() {
    if (sessionStorage.getItem('repos')) {
      this.repos = JSON.parse(sessionStorage.getItem('repos'))
    } else {
      this.getAllRepos()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/globalResume.css';
.title {
  width: 100%;
  text-align: center;
  font-size: 30px;
}
.info-list {
  height: auto;
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  padding-left: 20px;
  // position: relative;
  // top: 50%;
  // transform: translateY(-50%);
}
.info-item {
  width: 600px;
  height: auto;
  padding: 5px;
}
.info-title {
  font-weight: bold;
  color: rgb(18, 0, 100);
}
.carousel{
  width: 100%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 430px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #dbe9ff;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
