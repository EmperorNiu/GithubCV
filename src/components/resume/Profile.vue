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
        <div class="info-list">
          <ul style="list-style: none">
            <li v-if="profile.login != null">
              <span v-if="profile.login != null" class="info-title"
                >Nick Name:
              </span>
              <span v-if="profile.login != null" class="info-content">{{
                profile.login
              }}</span>
            </li>
            <li v-if="profile.name != null">
              <span v-if="profile.name != null" class="info-title"
                >User Name:
              </span>
              <span v-if="profile.name != null" class="info-content">{{
                profile.name
              }}</span>
            </li>
            <li>
              <span class="info-title">Created Time:</span>
              <span class="info-content">{{ profile.created_at }}</span>
            </li>
            <li>
              <span class="info-title">Update Time:</span>
              <span class="info-content">{{ profile.updated_at }}</span>
            </li>
            <!-- <li>Stars Number: </li> -->
            <li>
              <span class="info-title">Followers: </span>
              <span class="info-content">{{ profile.followers }}</span>
            </li>
            <li>
              <span class="info-title">Following: </span>
              <span class="info-content">{{ profile.following }}</span>
            </li>
            <li v-if="profile.company != null">
              <span v-if="profile.company != null" class="info-title"
                >Company:
              </span>
              <span v-if="profile.company != null" class="info-content">{{
                profile.company
              }}</span>
            </li>
            <li v-if="profile.location != null">
              <span v-if="profile.location != null" class="info-title"
                >Location:
              </span>
              <span v-if="profile.location != null" class="info-content">{{
                profile.location
              }}</span>
            </li>
            <li v-if="profile.twitter_username != null">
              <span v-if="profile.twitter_username != null" class="info-title"
                >Twitter Username:
              </span>
              <span
                v-if="profile.twitter_username != null"
                class="info-content"
                >{{ profile.twitter_username }}</span
              >
            </li>
            <li v-if="profile.bio != null">
              <span v-if="profile.bio != null" class="info-title">Bio: </span>
              <span v-if="profile.bio != null" class="info-content">{{
                profile.bio
              }}</span>
            </li>
          </ul>
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
  // margin: 10px 10px 10px 60px;
  width: 30%;
  align-self: center;
}
.info-list {
  width: 60%;
  align-self: center;
}
// .avatar-img {
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   margin-left: -60px;
//   margin-top: -60px;
// }
</style>
