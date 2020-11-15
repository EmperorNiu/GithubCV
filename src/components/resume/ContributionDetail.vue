<template>
  <div class='container'>
    <el-container>
      <el-aside width='15%'></el-aside>
      <el-main>
        <div class='container'>
          <el-page-header @back='goBack' content='Contribution Compare' title='back'>
          </el-page-header>
          <!-- 项目标题 -->
          <div class='repos-title'>
            {{repos.name}}
          </div>
          <!-- 项目内容 -->
          <div class='repos-content'>
            <div class='item'>
              <el-row>
                <el-col :span="16"><div class='item-title'>Trend of the number of Forks:</div></el-col>
                <el-col :span="8">
                  <el-radio-group v-model="fork_radio" size="small" style="line-height: 60px;">
                    <el-radio-button label="Number"></el-radio-button>
                    <el-radio-button label="Accumulated"></el-radio-button>
                  </el-radio-group>
                </el-col>
              </el-row>
              <div class="item-content">
                <div v-if="fork_radio === 'Number'"><compare-me></compare-me></div>
                <div v-else><compare-other></compare-other></div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
      <el-aside width='15%'></el-aside>
    </el-container>
  </div>
</template>

<script>
import Compare from '../repos/Compare.vue'
import Other from '../repos/Other.vue'

export default {
  data() {
    return {
      username: '',
      repos: {},
      reposIndex: 0,
      activitise: '0',
      fork_radio: 'Number'
    }
  },
  components: {
    compareMe: Compare,
    CompareOther: Other
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  mounted() {
  },
  created() {
  }
}
</script>

<style lang='less' scoped>
.container {
  height: 100%;
  width: 100%;
  // display: flex;
  // flex-direction: column;
  // background-image: url('../../assets/blue-snow.png');
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  // background-color: #D3DCE6;
  background-image: url('../../assets/blue-snow.png');
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-image: url('../../assets/so-white.png');
  // background-color: #E9EEF3;
  color: #333;
  text-align: center;
  // line-height: 160px;
}
.repos-title {
  font-size: 28px;
  height: 90px;
  line-height: 90px;
}
.time-card {
  height: 100px;
  // width: 550px;
}
.item {
  width: 100%;
  height: 530px;
  display: flex;
  flex-direction: column;
}
.item-title {
  width: 400px;
  font-size: 20px;
  height: 55px;
  line-height: 60px;
}
.item-content {
  margin-left: 160px;
  margin-top: 10px;
}
</style>
