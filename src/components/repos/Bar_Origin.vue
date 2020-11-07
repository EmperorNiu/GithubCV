<template>
  <div ref="fork_time_image" class="fork"></div>
</template>

<script>
export default {
  name: 'bar',
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
            data: forkData.data_origin
          }
        ]
      }
      chart.setOption(option)
    },
    initData() {
      var chart = this.$echarts.init(this.$refs.fork_time_image)
      if (sessionStorage.getItem('forkNum')) {
        var forkData = JSON.parse(sessionStorage.getItem('forkNum'))
        this.drawChart(chart, forkData)
      } else {
        var url =
          'repos/forkNum?username=' + this.username + '&repos=' + this.reposName
        this.$http.get(url).then((result) => {
          var forkData = result.data
          sessionStorage.setItem('forkNum', JSON.stringify(result.data))
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
