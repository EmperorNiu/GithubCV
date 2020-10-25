<template>
  <div>
    <el-card class="card">
      <div class="card-container">
        <div class="section-left">
          About This Resume
        </div>
        <div class="section-right">
          This resume is generated automatically using public information from the {{username}} GitHub account.
          The repositories are ordered by popularity based on a very simple popularity heuristic
          that defines the popularity of a repository by its sum of watchers and forks.
          Do not hesitate to visit {{username}} GitHub page for a complete work history.
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
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/globalResume.css';
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
</style>
