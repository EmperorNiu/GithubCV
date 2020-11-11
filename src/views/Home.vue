<template>
  <div class="container">
    <div class="name-input">
      <div class="title">Generate Your Github Resume</div>
      <el-input v-model="username">
        <template slot="prepend">
          <span style="color: green">Input your Github username</span>
        </template>
        <el-button slot="append" icon="el-icon-right" @click="getResume"></el-button>
      </el-input>
      <div class="sub-title">Show yourself by achievements</div>
    </div>
    <div class="footer">
      <span>Contract us</span>
      <el-divider direction="vertical"></el-divider>
      <span>Terms & Conditions</span>
      <el-divider direction="vertical"></el-divider>
      <span>Privacy Policy</span>
    </div>
    <!-- <SyncLoading
      :loading="perLoading"
      :type="'circle'">
    </SyncLoading> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import Loading from './Loading.vue'
export default {
  data() {
    return {
      username: '',
      perLoading: true
    }
  },
  // components: {
  //   SyncLoading: Loading
  // },
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
.title {
  color: wheat;
  font-size: 36px;
  font-weight: bold;
  height: 100px;
  // margin-left: 60px;
  text-align: center;
  line-height: 100px;
}
.sub-title {
  color: rgb(243, 228, 200);
  font-size: 22px;
  // font-weight: bold;
  height: 75px;
  // margin-left: 60px;
  text-align: center;
  line-height: 75px;
}
.name-input {
  width: 700px;
  // margin-left: 13%;
  left: 50%;
  top: 45%;
  position: absolute;
  transform: translate(-50%, -50%);
}
.footer {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 20px;
  color: #132433;
}
</style>
