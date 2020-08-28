<template>
  <div style="text-align: center;">
    <!-- 标题 -->
    <h1>{{username}} Resume</h1>
    <hr style="width:74%" />
    <!-- 基本介绍 -->
    <div class="section" style="height: 300px">
      <!-- <div class="section-left">Basic Information</div> -->
      <div class="avatar">
         <el-avatar :size="120" :src="circleUrl" class="avatar-img"></el-avatar>
      </div>
      <div class="info-list">
        <ul>
          <li>
            <span class="info-title">User Name: </span>
            <span class="info-content">{{username}}</span>
          </li>
          <li>Created Time:</li>
          <li>Stars Number: </li>
          <li>Followoers: </li>
          <li>website</li>
        </ul>
      </div>
    </div>
    <hr style="width:74%" />
    <!--  -->
    <div v-if="GetStats(name) != null" class="section" style="height: 200px;line-height: 200px;">
      <div v-if="GetStats(name) != null" class="section-left">个人主页</div>
      <div v-if="GetStats(name) != null" class="section-right">
        <a href="https://github.com/NiuYuean">{GetStats(name)}</a>
      </div>
    </div>
    <hr style="width:74%" />
    <div class="section" style="height: 400px;line-height: 400px;">
      <div class="section-left">Languages</div>
      <div class="section-right">
        <div id="my_chart" style="height:400px;"></div>
      </div>
    </div>
    <hr style="width:74%" />
    <div class="section" style="height: 400px;line-height: 400px;">
      <div class="section-left" style="font-size: 20px;">Popular Repositories</div>
      <div class="section-right">
      </div>
    </div>
    <hr style="width:74%" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      src: '',
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      stars: ''
    }
  },
  mounted() {
    this.username = this.$route.query.username
    this.GetStats()
    this.initCharts()
  },
  methods: {
    initCharts() {
      var echarts = require('echarts/dist/echarts.common.js')
      // 引入柱状图
      // require('echarts/lib/chart/bar')
      // 引入提示框和标题组件
      // require('echarts/lib/component/tooltip')
      // require('echarts/lib/component/title')
      this.chart = echarts.init(document.getElementById('my_chart'))
      this.setOptions()
    },
    setOptions() {
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['Python', 'JavaScript', 'C++', 'Golang', 'JupyterNotebook']
        },
        series: [
          {
            name: 'languages',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '25',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: 'Python' },
              { value: 310, name: 'JavaScript' },
              { value: 234, name: 'C++' },
              { value: 135, name: 'Golang' },
              { value: 1548, name: 'JupyterNotebook' }
            ]
          }
        ]
      })
    },
    GetStats(stats) {
      var url = 'https://api.github.com/users/' + this.username
      this.$http.get(url).then((result) => {
        // this.stars = result.stats
        console.log(result.data.name)
        return result.data.name
      })
    }
  }
}
</script>

<style lang="less" scoped>
.block {
  text-align: center;
  height: 300px;
  width: 300px;
}
.section {
  display: flex;
  flex-direction: row;
  margin-left: 13%;
  margin-right: 13%;
}
.section-left {
  width: 20%;
  font-size: 25px;
  font-weight: 5px;
}
.section-right {
  padding-left: 0;
  width: 75%;
  text-align: left;
}
.avatar {
  width: 20%;
  position: relative
}
.avatar-img {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -60px;
  margin-top: -60px;
}
.info-list {
  // display: flex;
  // flex-direction: column;
  margin-left: 20px;
  margin-top: 50px;
  li {
    margin-bottom: 10px;
  }
}
</style>
