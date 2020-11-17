<template>
  <div ref="fork_time_image" class="fork"></div>
</template>

<script>
export default {
  name: 'Ability',
  // props: ['username', 'reposName'],
  data() {
    return {
      username: 'advancedalgebra'
    }
  },
  methods: {
    drawChart() {
      var chart = this.$echarts.init(this.$refs.fork_time_image)
      var option = {
        title: {
          text: 'Language Ability',
          left: 'center'
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
          orient: 'vertical',
          left: 80,
          data: ['CSS', 'Go', 'HTML', 'JSON', 'JavaScript', 'Jupyter Notebook', 'Kotlin', 'Python', 'Vue']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '25%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
          height: 450,
          width: 800
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['2018-11', '2018-12', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05',
              '2019-06', '2019-07', '2019-08', '2019-09', '2019-10', '2019-11', '2019-12', '2020-01',
              '2020-02', '2020-03', '2020-04', '2020-05',
              '2020-06', '2020-07', '2020-08', '2020-09', '2020-10', '2020-11']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        // series: ability.series
        series: [
          {
            name: 'CSS',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8.3936, 8.1373, 16.1643, 15.6709, 15.2077, 14.7435, 14.2935, 13.8710, 14.0755, 14.2084]
          },
          {
            name: 'Go',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12.1713, 11.7998, 11.4510, 11.1015, 10.7626, 10.444, 13.5794, 13.4704]
          },
          {
            name: 'HTML',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.02719, 0.02636, 7.41683, 17.1468, 16.6234, 24.3432, 23.6001, 22.9026, 22.2036, 21.5473, 20.8896, 20.7171, 20.1048, 19.5180, 19.361]
          },
          {
            name: 'JSON',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [2.204708, 2.1374106, 2.0721674, 2.3967674, 2.3236074, 2.576849, 2.6348064, 2.5569365, 2.4788873, 2.4032207, 2.3321948, 2.2610059, 2.1941829, 2.127207, 2.062275, 12.798642, 12.407971, 22.107786, 21.43296, 20.799519, 20.164625, 30.500626, 29.599197, 31.646246, 32.35079]
          },
          {
            name: 'JavaScript',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [6.2151, 6.0254, 5.8415, 18.091, 17.538, 22.954, 28.719, 27.87, 27.019, 26.1949, 25.4207, 24.6448, 23.9164, 23.1864, 22.4786, 27.6937, 26.848, 38.0456, 36.8843, 35.7942, 34.701, 35.6720, 34.672, 36.61, 39.769]
          },
          {
            name: 'Jupyter Notebook',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0, 27.2029, 31.936075, 30.96124, 30.046, 29.129, 39.219, 48.763382, 47.274902, 45.923622, 44.521, 43.206, 41.887, 40.649, 39.4084, 38.205, 37.076, 39.6403, 39.322]
          },
          {
            name: 'Kotlin',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6.257, 6.689, 6.485, 6.2935243, 6.101, 5.91764, 5.7403, 5.5651, 5.52045]
          },
          {
            name: 'Python',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [1.2281185, 1.1906309, 1.1542876, 2.346, 2.2751, 2.20795, 2.1405, 12.947, 18.887642, 18.3118, 17.769, 17.2275, 16.718, 16.208, 15.713, 15.264, 14.798, 14.36, 13.922, 13.511, 13.098634, 12.698805, 12.3235, 17.5001, 17.3567]
          },
          {
            name: 'Vue',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10.8042, 10.474, 25.473, 24.6956, 23.965, 23.234, 31.919, 32.09, 62.872, 73.563]
          }
        ]
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
    // this.username = sessionStorage.getItem('username')
    // this.initData()
    this.drawChart()
  }
}
</script>

<style lang="less" scoped>
.fork {
  height: 550px;
  width: 1200px;
}
</style>
