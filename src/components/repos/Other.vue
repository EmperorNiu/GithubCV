<template>
  <div ref="fork_time_image" class="fork"></div>
</template>

<script>
export default {
  name: 'bar',
  // props: ['username', 'reposName'],
  data() {
    return {
      username: 'advancedalgebra'
    }
  },
  methods: {
    drawChart(chart, CompareOther) {
      var option = {
        legend: {},
        tooltip: {},
        dataset: {
          source: CompareOther.Response
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
      if (sessionStorage.getItem('Compare_Other')) {
        var PrIssue = JSON.parse(sessionStorage.getItem('Compare_Other'))
        this.drawChart(chart, PrIssue)
      } else {
        var url =
          'repos/compare_others/' + this.username
        this.$http.get(url).then((result) => {
          var CompareOther = result.data
          sessionStorage.setItem('Compare_Other', JSON.stringify(result.data))
          this.drawChart(chart, CompareOther)
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
