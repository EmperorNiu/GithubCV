<template>
  <div ref="fork_time_image" class="fork"></div>
</template>

<script>
export default {
  name: 'pr_issue',
  // props: ['username', 'reposName'],
  data() {
    return {
      username: 'hinesboy',
      reposName: 'mavonEditor'
    }
  },
  methods: {
    drawChart(chart, PrIssue) {
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['蒸发量', '降水量', '平均温度']
        },
        xAxis: [
          {
            type: 'category',
            data: PrIssue.date,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Issue & PR',
            min: 0,
            max: 40,
            interval: 10,
            axisLabel: {
              formatter: '{value} 次'
            }
          },
          {
            type: 'value',
            name: 'commit数量',
            min: 0,
            max: 60,
            interval: 10,
            axisLabel: {
              formatter: '{value} 次'
            }
          }
        ],
        series: [
          {
            name: 'PR',
            type: 'bar',
            data: PrIssue.pr
          },
          {
            name: 'Issue',
            type: 'bar',
            data: PrIssue.issue
          },
          {
            name: 'commit',
            type: 'line',
            yAxisIndex: 1,
            data: PrIssue.commit
          }
        ]
      }
      chart.setOption(option)
    },
    initData() {
      var chart = this.$echarts.init(this.$refs.fork_time_image)
      if (sessionStorage.getItem('PrIssue')) {
        var PrIssue = JSON.parse(sessionStorage.getItem('PrIssue'))
        this.drawChart(chart, PrIssue)
      } else {
        var url =
          'repos/pr_issue_commit/' + this.username + '/' + this.reposName
        this.$http.get(url).then((result) => {
          var PrIssue = result.data
          sessionStorage.setItem('PrIssue', JSON.stringify(result.data))
          this.drawChart(chart, PrIssue)
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
