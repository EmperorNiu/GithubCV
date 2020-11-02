<template>
  <div>
    <el-card class="card">
      <div class="card-container">
        <div class="section-left">
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
      repos: []
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
          console.log(this.repos)
          // sessionStorage.setItem('repos', JSON.stringify(this.repos))
        })
      }
    }
  },
  created() {
    this.getAllRepos()
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/globalResume.css';
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
  width: 350px;
  height: 40px;
  padding: 5px;
}
.info-title {
  font-weight: bold;
  color: rgb(18, 0, 100);
}
</style>
