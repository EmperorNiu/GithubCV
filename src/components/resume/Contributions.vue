<template>
  <div>
    <el-card class="card">
      <div class="card-container-col">
        <el-table
          :data="contribution"
          border
          max-height="550"
          style="margin-top: 15px"
        >
          <el-table-column prop="repos" label="repository name">
          </el-table-column>
          <el-table-column prop="commit" label="commits number">
          </el-table-column>
          <el-table-column prop="issue" label="commits number">
          </el-table-column>
        </el-table>
        <div class="button-container">
          <el-button @click="pushDetail">Contribution Analysis</el-button>
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
      sum: '11',
      contribution: []
    }
  },
  methods: {
    getContribution() {
      var url = '/user/contribution?username=' + this.username
      this.$http.get(url).then((result) => {
        var data = result.data
        this.sum = data.total_count
        this.contribution = data.contribution
        sessionStorage.setItem('contribution', JSON.stringify(result.data))
      })
    },
    pushDetail() {
      this.$router.push({
        path: 'contributionDetail'
      })
    }
  },
  created() {
    if (sessionStorage.getItem('contribution')) {
      var data = JSON.parse(sessionStorage.getItem('contribution'))
      this.contribution = data
      // this.sum = data.total_count
    } else {
      this.getContribution()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/globalResume.css';
.info-container {
  margin-left: 6%;
  width: 60%;
  height: 500px;
  display: flex;
  flex-direction: column;
}
.info-list {
  height: auto;
  align-self: center;
  display: flex;
  flex-direction: column;
  // position: relative;
  // top: 50%;
  // transform: translateY(-50%);
}
.info-item {
  width: 450px;
  height: 35px;
  padding: 5px;
}
.info-title {
  font-weight: bold;
  color: rgb(18, 0, 100);
}
.button-container {
  margin-top: 20px;
  width: 100%;
  text-align: center;
}
</style>
