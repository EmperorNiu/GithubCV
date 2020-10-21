<template>
  <div>
    <el-card class="card">
      <div class="card-container">
        <div class="avatar">
          <el-avatar
            :size="150"
            :src="profile.avatar_url"
            class="avatar-img"
          ></el-avatar>
        </div>
        <div class="info-container">
          <div class="info-list">
            <div class="info-item">
              <span class="info-title">Nick Name: </span>
              <span class="info-content">{{profile.login}}</span>
            </div>
            <div v-if="profile.name != null" class="info-item">
              <span v-if="profile.name != null" class="info-title">User Name:</span>
              <span v-if="profile.name != null" class="info-content">{{
                  profile.name
                }}</span>
            </div>
            <div class="info-item">
              <span class="info-title">Created Time:</span>
              <span class="info-content">{{ profile.created_at }}</span>
            </div>
            <div class="info-item">
              <span class="info-title">Update Time:</span>
              <span class="info-content">{{ profile.updated_at }}</span>
            </div>
            <div class="info-item">
              <span class="info-title">Followers: </span>
              <span class="info-content">{{ profile.followers }}</span>
            </div>
            <div class="info-item">
              <span class="info-title">Following: </span>
              <span class="info-content">{{ profile.following }}</span>
            </div>
            <div class="info-item">
              <span v-if="profile.company != null" class="info-title">Company: </span>
              <span v-if="profile.company != null" class="info-content">{{
                  profile.company
                }}</span>
            </div>
            <div class="info-item">
            <span v-if="profile.location != null" class="info-title"
            >Location:
            </span>
              <span v-if="profile.location != null" class="info-content">{{
                  profile.location }}</span>
            </div>
            <div class="info-item" v-if="profile.twitter_username != null">
              <span v-if="profile.twitter_username != null" class="info-title"
                >Twitter Username:
              </span>
              <span
                v-if="profile.twitter_username != null"
                class="info-content"
              >{{ profile.twitter_username }}</span>
            </div>
            <div class="info-item" v-if="profile.bio != null">
              <span v-if="profile.bio != null" class="info-title">Bio: </span>
              <span v-if="profile.bio != null" class="info-content">{{ profile.bio }}</span>
            </div>
          </div>
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
      profile: {}
    }
  },
  methods: {
    GetStats() {
      var url = 'https://api.github.com/users/' + this.username
      this.$http.get(url).then((result) => {
        console.log(result)
        this.profile = result.data
      })
    }
  },
  created() {
    this.GetStats()
  }
}
</script>

<style lang="less" scoped>
.card {
  height: 560px;
  width: 84%;
  margin-top: 20px;
  margin-left: 8%;
}
.card-container {
  display: flex;
  flex-direction: row;
  height: 520px;
}
.avatar {
  width: 30%;
  height: 500px;
  //align-self: center;
}
.avatar-img {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  //margin-left: -210px;
  line-height: 500px;
  //margin-top: -210px;
}
.info-container {
  width: 60%;
  height: 500px;
}
.info-list {
  height: auto;
  align-self: center;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.info-item {
  width: 300px;
  height: 40px;
  padding: 5px;
}
</style>
