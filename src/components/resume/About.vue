<template>
  <div>
    <el-card class="card">
      <div class="card-container-col">
        <div class="section">
          <div class="section-title">
            About This Resume
          </div>
          <div class="section-content">
            <div class="about-text">
              This resume is generated automatically using public information from the {{username}}
              GitHub account by Github API. The repositories are ordered by popularity based on a
              very simple popularity heuristic that defines the popularity of a repository by its
              sum of watchers and forks. Do not hesitate to visit {{username}} GitHub page for a complete work history.
            </div>
          </div>
        </div>
        <div class="word-cloud">
          <img src="../../assets/result.jpg" style="width:70%; margin-left:15%">
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
      he: '11'
    }
  },
  mounted() {
    this.username = sessionStorage.getItem('username')
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/globalResume.css';
.section {
  height: 250px;
  display: flex;
  flex-direction: row;
}
.section-title {
  width: 30%;
  font-size: 24px;
  font-weight: 5px;
  line-height: 250px;
  text-align: center;
}
.section-content {
  text-indent:2em;
  padding-top: 75px;
  padding-left: 8%;
  padding-right: 10%;
  width: 70%;
  // text-align: left;
}
.about-text {
  font-size: 18px;
}
.word-cloud {
  width: 100%;
}
</style>
