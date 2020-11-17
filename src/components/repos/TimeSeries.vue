<template>
  <div ref="fork_time_image" class="fork"></div>
</template>

<script>
export default {
  name: 'timeSeries',
  // props: ['username', 'reposName'],
  data() {
    return {
      username: 'hinesboy',
      reposName: 'mavonEditor'
    }
  },
  methods: {
    drawChart(chart, forkData) {
      // var base = new Date(1968, 9, 3)
      // var oneDay = 24 * 3600 * 1000
      // var date = []
      // var data = [Math.random() * 300]
      // for (var i = 1; i < 20000; i++) {
      //   var now = new Date(base += oneDay)
      //   date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
      //   data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]))
      // }
      var option = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        title: {
          left: 'center',
          text: 'Fork Time Series'
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        grid: {
          height: 390,
          width: 700
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: forkData.date
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 10
        }, {
          start: 0,
          end: 10,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        series: [
          {
            name: 'Forks Number',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(255, 158, 68)'
              }, {
                offset: 1,
                color: 'rgb(255, 70, 131)'
              }])
            },
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
        var url = 'repos/forkNum?username=' + this.username + '&repos=' + this.reposName
        this.$http.get(url).then((result) => {
          var forkData = result.data
          sessionStorage.setItem('forkNum', JSON.stringify(result.data))
          // chart.hideLoadinig()
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
  height: 600px;
  width: 1000px;
}
</style>
