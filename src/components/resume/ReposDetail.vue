<template>
  <div class='container'>
    <el-container>
      <el-aside width='15%'></el-aside>
      <el-main>
        <div class='container'>
          <el-page-header @back='goBack' content='Repository Detail' title='back'>
          </el-page-header>
          <!-- 项目标题 -->
          <div class='repos-title'>
            {{repos.name}}
          </div>
          <!-- 项目内容 -->
          <div class='repos-content'>
            <div class='item'>
              <div class='item-title'>Forks:</div>
              <div class='item-image1' ref='fork_tree_image'></div>
            </div>
          </div>
        </div>
      </el-main>
      <el-aside width='15%'></el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'EmperorNiu',
      repos: {},
      reposIndex: 0,
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }]
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    initDataAndChart() {
      var chart = this.$echarts.init(this.$refs.fork_tree_image)
      // 准备数据
      var data = {
        name: 'flare',
        children: [
          {
            name: 'data',
            children: [
              {
                name: 'converters',
                children: [
                  { name: 'Converters', value: 721 },
                  { name: 'DelimitedTextConverter', value: 4294 }
                ]
              },
              {
                name: 'DataUtil',
                value: 3322
              }
            ]
          },
          {
            name: 'display',
            children: [
              { name: 'DirtySprite', value: 8833 },
              { name: 'LineSprite', value: 1732 },
              { name: 'RectSprite', value: 3623 }
            ]
          },
          {
            name: 'flex',
            children: [
              { name: 'FlareVis', value: 4116 }
            ]
          },
          {
            name: 'query',
            children: [
              { name: 'AggregateExpression', value: 1616 },
              { name: 'And', value: 1027 },
              { name: 'Arithmetic', value: 3891 },
              { name: 'Average', value: 891 },
              { name: 'BinaryExpression', value: 2893 },
              { name: 'Comparison', value: 5103 },
              { name: 'CompositeExpression', value: 3677 },
              { name: 'Count', value: 781 },
              { name: 'DateUtil', value: 4141 },
              { name: 'Distinct', value: 933 },
              { name: 'Expression', value: 5130 },
              { name: 'ExpressionIterator', value: 3617 },
              { name: 'Fn', value: 3240 },
              { name: 'If', value: 2732 },
              { name: 'IsA', value: 2039 },
              { name: 'Literal', value: 1214 },
              { name: 'Match', value: 3748 },
              { name: 'Maximum', value: 843 },
              {
                name: 'methods',
                children: [
                  { name: 'add', value: 593 },
                  { name: 'and', value: 330 },
                  { name: 'average', value: 287 },
                  { name: 'count', value: 277 },
                  { name: 'distinct', value: 292 },
                  { name: 'div', value: 595 },
                  { name: 'eq', value: 594 },
                  { name: 'fn', value: 460 },
                  { name: 'gt', value: 603 },
                  { name: 'gte', value: 625 },
                  { name: 'iff', value: 748 },
                  { name: 'isa', value: 461 },
                  { name: 'lt', value: 597 },
                  { name: 'lte', value: 619 },
                  { name: 'max', value: 283 },
                  { name: 'min', value: 283 },
                  { name: 'mod', value: 591 },
                  { name: 'mul', value: 603 },
                  { name: 'neq', value: 599 },
                  { name: 'not', value: 386 },
                  { name: 'or', value: 323 },
                  { name: 'orderby', value: 307 },
                  { name: 'range', value: 772 },
                  { name: 'select', value: 296 },
                  { name: 'stddev', value: 363 },
                  { name: 'sub', value: 600 },
                  { name: 'sum', value: 280 },
                  { name: 'update', value: 307 },
                  { name: 'variance', value: 335 },
                  { name: 'where', value: 299 },
                  { name: 'xor', value: 354 },
                  { name: 'x_x', value: 264 }
                ]
              },
              { name: 'Minimum', value: 843 },
              { name: 'Not', value: 1554 },
              { name: 'Or', value: 970 },
              { name: 'Query', value: 13896 },
              { name: 'Range', value: 1594 },
              { name: 'StringUtil', value: 4130 },
              { name: 'Sum', value: 791 },
              { name: 'Variable', value: 1124 },
              { name: 'Variance', value: 1876 },
              { name: 'Xor', value: 1101 }
            ]
          },
          {
            name: 'scale',
            children: [
              { name: 'IScaleMap', value: 2105 },
              { name: 'LinearScale', value: 1316 },
              { name: 'LogScale', value: 3151 },
              { name: 'OrdinalScale', value: 3770 },
              { name: 'QuantileScale', value: 2435 },
              { name: 'QuantitativeScale', value: 4839 },
              { name: 'RootScale', value: 1756 },
              { name: 'Scale', value: 4268 },
              { name: 'ScaleType', value: 1821 },
              { name: 'TimeScale', value: 5833 }
            ]
          }
        ]
      }
      var option = {
        title: {
          text: '所有项目编程语言分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            id: 0,
            name: 'tree1',
            data: [data],

            top: '10%',
            left: '8%',
            bottom: '22%',
            right: '20%',

            symbolSize: 7,

            edgeShape: 'polyline',
            edgeForkPosition: '63%',
            initialTreeDepth: 3,

            lineStyle: {
              width: 2
            },

            label: {
              backgroundColor: '#fff',
              position: 'left',
              verticalAlign: 'middle',
              align: 'right'
            },

            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },

            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      }
      chart.setOption(option)
    }
  },
  mounted() {
    this.initDataAndChart()
  },
  created() {
    this.reposIndex = this.$route.query.reposIndex
    var repos = JSON.parse(sessionStorage.getItem('repos'))
    this.repos = repos[this.reposIndex]
  }
}
</script>

<style lang='less' scoped>
.container {
  height: 100%;
  width: 100%;
  // display: flex;
  // flex-direction: column;
  // background-image: url('../../assets/blue-snow.png');
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  // background-color: #D3DCE6;
  background-image: url('../../assets/blue-snow.png');
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-image: url('../../assets/so-white.png');
  // background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.repos-title {
  font-size: 28px;
}
.time-card {
  height: 100px;
  // width: 550px;
}
.item {
  width: 700px;
  height: 500px;
  display: flex;
  flex-direction: column;
}
.item-title {
  width: 200px;
  font-size: 20px;
  height: 60px;
}
</style>
