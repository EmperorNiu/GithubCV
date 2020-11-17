<template>
  <div ref="language_rank" class="language-image"></div>
</template>

<script>
export default {
  name: 'language_rank',
  data() {
    return {
    }
  },
  methods: {
    drawChart() {
      var chart = this.$echarts.init(this.$refs.language_rank)
      var option = {
        title: {
          text: 'Programming Language Percent in GitHub',
          left: 'center'
        },
        legend: {
          orient: 'vertical',
          left: 100,
          selected: { // 设置默认不显示
            Shell: false,
            Groovy: false,
            Lua: false,
            Dart: false,
            Kotlin: false,
            PoweRustrShell: false,
            Swift: false,
            Rust: false
          }
        },
        tooltip: {
          trigger: 'axis',
          showContent: true
        },
        dataset: {
          source: [
            ['Language', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
            ['JavaScript', 0.21556, 0.23205, 0.24750, 0.24996, 0.26161, 0.25399, 0.22193, 0.20589, 0.23263],
            ['Python', 0.14612, 0.14281, 0.13557, 0.13362, 0.13256, 0.14128, 0.14448, 0.15314, 0.14935],
            ['Java', 0.09116, 0.10471, 0.11245, 0.12017, 0.12004, 0.11903, 0.11036, 0.11129, 0.10942],
            ['Go', 0.00922, 0.01728, 0.02897, 0.03905, 0.04411, 0.05473, 0.06475, 0.07491, 0.07920],
            ['C++', 0.06399, 0.06007, 0.06457, 0.06187, 0.06922, 0.06809, 0.06896, 0.07148, 0.07759],
            ['Ruby', 0.15036, 0.12080, 0.08651, 0.06499, 0.04807, 0.04121, 0.03731, 0.03778, 0.03793],
            ['TypeScript', 0.00165, 0.00283, 0.00510, 0.00752, 0.01650, 0.02803, 0.03872, 0.04640, 0.05590],
            ['PHP', 0.09910, 0.09956, 0.09117, 0.08433, 0.07295, 0.06351, 0.06622, 0.05614, 0.05266],
            ['C#', 0.01888, 0.02234, 0.02601, 0.03395, 0.03653, 0.04994, 0.04973, 0.04163, 0.03983],
            ['C', 0.06909, 0.06115, 0.05390, 0.04893, 0.04627, 0.04168, 0.03630, 0.03761, 0.04102],
            ['Scala', 0.01053, 0.01045, 0.01018, 0.01000, 0.00984, 0.01057, 0.00928, 0.00947, 0.01033],
            ['Shell', 0.01896, 0.02035, 0.02491, 0.02841, 0.03391, 0.03204, 0.03652, 0.03140, 0.03109],
            ['Rust', 0.00093, 0.00124, 0.00402, 0.00730, 0.00816, 0.00897, 0.00772, 0.00870, 0.00972],
            ['Swift', 0.00039, 0.00077, 0.00622, 0.01718, 0.02301, 0.01925, 0.01713, 0.01525, 0.01286],
            ['Kotlin', 0.00020, 0.00049, 0.00053, 0.00095, 0.00198, 0.00369, 0.00653, 0.00774, 0.00853],
            ['Dart', 0.00064, 0.00145, 0.00188, 0.00142, 0.00078, 0.00086, 0.00136, 0.00490, 0.00776]
          ]
        },
        xAxis: { type: 'category' },
        yAxis: { gridIndex: 0 },
        grid: {
          top: '50%',
          height: 200
        },
        series: [
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '25%'],
            label: {
              formatter: '{b}:{d}%'
            },
            encode: {
              itemName: 'Language',
              value: '2012',
              tooltip: '2012'
            }
          }
        ]
      }
      chart.on('updateAxisPointer', function (event) {
        var xAxisInfo = event.axesInfo[0]
        if (xAxisInfo) {
          var dimension = xAxisInfo.value + 1
          chart.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}:{d}%'
              },
              encode: {
                value: dimension,
                tooltip: dimension
              }
            }
          })
        }
      })
      chart.setOption(option)
    }
  },
  mounted() {
    this.drawChart()
  }
}
</script>

<style lang="less" scoped>
.language-image {
  height: 750px;
  width: 100%;
  text-align: center;
}
</style>
