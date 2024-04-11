<template>
  <div class="form">
    <el-form label-position="top">
      <h2>黄果树景区导游信息报备</h2>
      <el-form-item label="旅行社名称">
        <el-input />
      </el-form-item>
      <el-form-item label="导游姓名">
        <el-input />
      </el-form-item>
      <el-form-item label="导游身份证号">
        <el-input />
      </el-form-item>
      <el-form-item label="上传导游身份证照片（头像面）">
        <el-upload
          class="upload"
          drag
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
        >
          <div class="el-upload__text">将图片放到这里或<em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">文件小于500kb的Jpg /png文件</div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="导游证号">
        <el-input />
      </el-form-item>
      <el-form-item label="导游电话">
        <el-input />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.form {
  background-color: #e9e9eb;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    width: 500px;
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    .el-form-item {
      margin-top: 20px;
      .upload {
        width: 500px;
      }
    }
  }
}
</style>
