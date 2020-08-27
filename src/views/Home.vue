<template>
  <div class="container">
    <div class="name-input">
      <el-input v-model="username">
        <template slot="prepend">
          <span style="color: green">Input your Github username</span>
        </template>
        <el-button slot="append" icon="el-icon-right" @click="getResume"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  data() {
    return {
      username: ''
    }
  },
  methods: {
    getResume() {
      this.$router.push({
        path: '/resume',
        query: {
          username: this.username
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  background: -moz-linear-gradient(top, #050505 0%, #e4e4e4 100%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #050505),
    color-stop(100%, #e4e4e4)
  );
  background: -webkit-linear-gradient(top, #050505 0%, #e4e4e4 100%);
  background: -o-linear-gradient(top, #050505 0%, #e4e4e4 100%);
  background: -ms-linear-gradient(top, #050505 0%, #e4e4e4 100%);
  background: linear-gradient(to bottom, #050505 0%, #e4e4e4 100%);
}
.name-input {
  width: 600px;
  // margin-left: 13%;
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}
</style>
