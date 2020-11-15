<template>
  <div>
    <el-card class="card">
      <div class="card-container-language">
        <ability></ability>
        <!-- 各语言占比 -->
        <!-- <div class="section-left">Languages</div> -->
        <!-- <div class="language-image-container">
          <div ref="language_pie" style="height:480px;"></div>
        </div>
        <div class="button-container">
          <el-button @click="dialogVisible = true">Deep in Tech Skills</el-button>
        </div>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <span>It may take a while</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="deepAnalysis">OK</el-button>
          </span>
        </el-dialog> -->
      </div>
    </el-card>
  </div>
</template>

<script>
import Ability from '../repos/ability.vue'
export default {
  data() {
    return {
      username: 'EmperorNiu',
      dialogVisible: false
    }
  },
  components: {
    ability: Ability
  },
  methods: {
    initDataAndChart() {
      var chart = this.$echarts.init(this.$refs.language_pie)
      // chart.showLoading()
      if (sessionStorage.getItem('languages')) {
        var languageData = JSON.parse(sessionStorage.getItem('languages'))
        this.drawChart(chart, languageData)
      } else {
        this.$http.get('repos/languages?username=' + this.username).then((result) => {
          var languageData = result.data
          // this.languageData = result.data
          sessionStorage.setItem('languages', JSON.stringify(result.data))
          // chart.hideLoadinig()
          // console.log(languageData)
          this.drawChart(chart, languageData)
        })
      }
    },
    drawChart(chart, languageData) {
      // 准备数据
      var option = {
        title: {
          text: 'The Proportion of Programming Language',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 200,
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
            data: languageData.percent
          }
        ]
      }
      chart.setOption(option)
    },
    handleClose(done) {
      this.$confirm('Confirm close？')
        .then(_ => {
          done()
        })
    },
    deepAnalysis() {
      this.$router.push({
        path: 'tech'
      })
    }
  },
  mounted() {
    this.username = sessionStorage.getItem('username')
    // this.initDataAndChart()
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/globalResume.css';
.card-container-language {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  height: 550px;
}
.language-image-container {
  // padding-left: 10px;
  width: 100%;
  text-align: center;
}
.button-container {
  width: 100%;
  text-align: center;
}
</style>
