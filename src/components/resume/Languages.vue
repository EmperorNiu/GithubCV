<template>
  <div>
    <el-card class="card">
      <div class="card-container">
        <!-- 各语言占比 -->
        <div class="section-left">Languages</div>
        <div class="section-right">
          <div ref="language_pie" style="height:480px;"></div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'EmperorNiu'
    }
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
    }
  },
  mounted() {
    this.initDataAndChart()
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
