<template>
  <div>
    <h3>结果显示</h3>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Top 3</span>
      </div>
      <div v-for="o in 3    " :key="o" class="text item">{{'类别' + o + ':     ' + o}}%</div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: ''
    }
  }
}
</script>

<style lang="less" scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    margin-left: 18%;
  }
</style>
