<template>
  <div class="container">
    <div class="upload-image">
      <div class="text-des">
        <h3>上传图片</h3>
      </div>
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8002/api/image/upload"
        :show-file-list="false"
        :on-preview="handlePictureCardPreview"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="avatar-uploader">上传</i>
      </el-upload>
      <el-select v-model="modelSelect" placeholder="选择模型">
        <el-option v-for="item in model_options" :key="item" :label="item.name" :value="item.label"></el-option>
      </el-select>
      <el-button type="primary" round @click="classify" style="margin-left:25px;">图片分类</el-button>
    </div>
    <div class="show-result">
      <h3>结果显示</h3>
      <el-card class="result-card">
        <div slot="header" class="clearfix">
          <span>Top 3 类别</span>
        </div>
        <el-table :data="result" style="width: 100%" v-loading="loading">
          <el-table-column prop="name" label="类别名称"></el-table-column>
          <el-table-column prop="prob" label="概率"></el-table-column>
        </el-table>
        <div style="margin-top:20px">共用时: {{time}}s</div>
        <!-- <div>类别：{{result.pred_label1}} 概率：{{result.pred_prob1}}</div>
        <div>类别：{{result.pred_label2}} 概率：{{result.pred_prob2}}</div>
        <div>类别：{{result.pred_label3}} 概率：{{result.pred_prob3}}</div>-->
        <!-- <div v-for="o in 3" :key="o" class="text item">{{'类别' + o + ': ' + o}}%</div> -->
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      imageUrl: '',
      imageId: 0,
      result: [
        { name: '???', prob: 0 },
        { name: '???', prob: 0 },
        { name: '???', prob: 0 }
      ],
      modelSelect: '',
      time: 0,
      model_options: [
        {
          name: 'efficient-attention-model',
          label: '1'
        },
        {
          name: 'mixed-model',
          label: '2'
        }
      ],
      loading: false
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageId = res.image.image_id
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(this.modelSelect)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    classify() {
      this.loading = true
      var url =
        '/image/classify?model=' +
        this.modelSelect +
        '&image_id=' +
        this.imageId
      this.$http.get(url).then(result => {
        var tmp = result.data.result
        this.result = [
          { name: tmp.pred_label1, prob: tmp.pred_prob1 },
          { name: tmp.pred_label2, prob: tmp.pred_prob2 },
          { name: tmp.pred_label3, prob: tmp.pred_prob3 }
        ]
        this.time = tmp.time
        this.loading = false
        // console.log(this.result)
      })
    }
  }
}
</script>

<style lang="less">
.container {
  display: flex;
  flex-direction: row;
}
.upload-image {
  width: 50%;
}
.show-result {
  width: 50%;
}
.result-card {
  margin-left: 25%;
  width: 50%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 220px;
  height: 220px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader {
  font-size: 25px;
  color: grey;
  // width: 130px;
  // height: 130px;
  line-height: 220px;
  text-align: center;
}
.avatar {
  width: 220px;
  height: 220px;
  display: block;
}
</style>
