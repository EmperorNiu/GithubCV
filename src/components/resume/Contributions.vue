<template>
  <div>
    <el-card class="card">
      <div class="card-container">
        <div class="section-left">
          Contributions
        </div>
        <div class="section-right">
          TNothing
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'EmperorNiu',
      he: '11'
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/globalResume.css';
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
</style>
