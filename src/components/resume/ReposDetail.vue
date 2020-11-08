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
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="Overview" name="0">
                <div class='item'>
                  <div class='item-title'>Overview:</div>
                  <div class="item-content">
                    <prIssue></prIssue>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="Contribution" name="1">配置管理</el-tab-pane>
              <el-tab-pane label="Fork" name="2">
                <div class='item'>
                  <el-row>
                    <el-col :span="16"><div class='item-title'>Trend of the number of Forks:</div></el-col>
                    <el-col :span="8">
                      <el-radio-group v-model="fork_radio" size="small" style="line-height: 60px;">
                        <el-radio-button label="Number"></el-radio-button>
                        <el-radio-button label="Accumulated"></el-radio-button>
                      </el-radio-group>
                    </el-col>
                  </el-row>
                  <div class="item-content">
                    <div v-if="fork_radio === 'Number'"><barOrigin></barOrigin></div>
                    <div v-else><barSum></barSum></div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="PullRequest" name="3">定时任务补偿</el-tab-pane>
              <el-tab-pane label="Code&Commit" name="4">
                <div class='item'>
                  <div class='item-title'>Commit Numbers:</div>
                  <div class="item-content">
                    <timeSeries></timeSeries>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="Issue" name="5">定时任务补偿</el-tab-pane>
              <el-tab-pane label="Collaboration" name="6">定时任务补偿</el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-main>
      <el-aside width='15%'></el-aside>
    </el-container>
  </div>
</template>

<script>
import PrIssue from '../repos/Pr_Issue.vue'
import BarOrigin from '../repos/Bar_Origin.vue'
import BarSum from '../repos/Bar_Sum.vue'
import TimeSeries from '../repos/TimeSeries.vue'
export default {
  data() {
    return {
      username: 'EmperorNiu',
      repos: {},
      reposIndex: 0,
      activitise: '0',
      fork_radio: 'Number'
    }
  },
  components: {
    prIssue: PrIssue,
    barOrigin: BarOrigin,
    barSum: BarSum,
    timeSeries: TimeSeries
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
  // line-height: 160px;
}
.repos-title {
  font-size: 28px;
  height: 90px;
  line-height: 90px;
}
.time-card {
  height: 100px;
  // width: 550px;
}
.item {
  width: 100%;
  height: 530px;
  display: flex;
  flex-direction: column;
}
.item-title {
  width: 400px;
  font-size: 20px;
  height: 55px;
  line-height: 60px;
}
.item-content {
  margin-left: 160px;
  margin-top: 10px;
}
</style>
