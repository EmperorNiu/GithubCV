<template>
  <div ref="fork_time_image" class="fork"></div>
</template>

<script>
export default {
  name: 'bar',
  // props: ['username', 'reposName'],
  data() {
    return {
      username: 'hinesboy'
    }
  },
  methods: {
    drawChart(chart, Compare) {
      var option = {
        legend: {},
        tooltip: {},
        dataset: {
          source: Compare.Response
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
      }
      chart.setOption(option)
    },
    initData() {
      var chart = this.$echarts.init(this.$refs.fork_time_image)
      if (sessionStorage.getItem('Compare')) {
        var PrIssue = JSON.parse(sessionStorage.getItem('Compare'))
        this.drawChart(chart, PrIssue)
      } else {
        var url = 'repos/compare/' + this.username
        this.$http.get(url).then((result) => {
          var Compare = result.data
          sessionStorage.setItem('Compare', JSON.stringify(result.data))
          this.drawChart(chart, Compare)
        })
      }
    }
  },
  mounted() {
    this.initData()
  },
  created() {
    this.username = sessionStorage.getItem('username')
  }
}
</script>

<style lang="less" scoped>
.fork {
  height: 450px;
  width: 700px;
}
</style>
