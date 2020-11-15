<template>
  <div ref="fork_time_image" class="fork"></div>
</template>

<script>
export default {
  name: 'Ability',
  // props: ['username', 'reposName'],
  data() {
    return {
      username: 'EmperorNiu'
    }
  },
  methods: {
    drawChart(chart, ability) {
      var option = {
        title: {
          text: '堆叠区域图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ability.legend
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ability.xAxis
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: ability.series
      }
      chart.setOption(option)
    },
    initData() {
      var chart = this.$echarts.init(this.$refs.fork_time_image)
      if (sessionStorage.getItem('Ability')) {
        var PrIssue = JSON.parse(sessionStorage.getItem('Ability'))
        this.drawChart(chart, PrIssue)
      } else {
        var url = 'user/ability/' + this.username
        this.$http.get(url).then((result) => {
          var ability = result.data
          sessionStorage.setItem('ability', JSON.stringify(result.data))
          this.drawChart(chart, ability)
        })
      }
    }
  },
  mounted() {
    this.initData()
  }
}
</script>

<style lang="less" scoped>
.fork {
  height: 450px;
  width: 700px;
}
</style>
