<template>
  <div ref="fork_time_image" class="fork"></div>
</template>

<script>
export default {
  name: 'compare',
  // props: ['username', 'reposName'],
  data() {
    return {
      username: 'EmperorNiu'
    }
  },
  methods: {
    drawChart(chart, Compare) {
      var option = {
        legend: {},
        tooltip: {},
        dataset: {
          source: Compare.himself
        },
        grid: {
          height: 400,
          width: 700
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
        var url = 'repos/compare_details/' + this.username
        // console.log(url)
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
  height: 600px;
  width: 1000px;
}
</style>
