<template>
  <div ref="fork_time_image" class="fork"></div>
</template>

<script>
export default {
  name: 'bar_origin',
  // props: ['username', 'reposName'],
  data() {
    return {
      username: 'hinesboy',
      reposName: 'mavonEditor'
    }
  },
  methods: {
    drawChart(chart, forkData) {
      var option = {
        title: {
          text: 'Changes in the number of forks in each month',
          left: 'center'
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
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
            data: forkData.date,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Fork 数量',
            type: 'bar',
            barWidth: '60%',
            data: forkData.fork
          }
        ]
      }
      chart.setOption(option)
    },
    initData() {
      var chart = this.$echarts.init(this.$refs.fork_time_image)
      if (sessionStorage.getItem('repo_detail')) {
        var forkData = JSON.parse(sessionStorage.getItem('repo_detail'))
        this.drawChart(chart, forkData)
      } else {
        var url =
          'repos/details/' + this.username + '/' + this.reposName
        this.$http.get(url).then((result) => {
          var forkData = result.data
          sessionStorage.setItem('repo_detail', JSON.stringify(result.data))
          this.drawChart(chart, forkData)
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
