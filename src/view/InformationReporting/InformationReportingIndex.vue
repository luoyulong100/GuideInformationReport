<template>
  <div class="form">
    <div class="item">
      <el-form label-position="top" :rules="rules" :model="form" ref="formRef">
        <h2>黄果树景区导游信息报备</h2>
        <el-form-item label="旅行社名称" prop="idName">
          <el-input placeholder="请输入营业执照旅行社名称" v-model="form.idName" />
        </el-form-item>
        <el-form-item label="导游姓名" prop="userName">
          <el-input placeholder="请上传身份证人像面" v-model="form.name" disabled />
        </el-form-item>
        <el-form-item label="导游身份证号" prop="idCard">
          <el-input placeholder="请上传身份证人像面" v-model="form.num" disabled />
        </el-form-item>

        <div v-if="form.name == '' && form.num == ''">
          <input ref="idCardInput" type="file" id="idCard" @change="uploadIdCard" hidden />
          <label for="idCard">
            <el-check-tag checked v-loading="loading">点击上传</el-check-tag>
          </label>
          <img ref="preImg" :src="form.idCardSrc" alt="" style="width: 150px" />
        </div>
        <el-tag type="info" size="Large" effect="light" v-else>已上传</el-tag>

        <el-form-item label="导游证号" prop="userId">
          <el-input placeholder="请输入导游证号" v-model="form.userId" />
        </el-form-item>
        <el-form-item label="导游电话" prop="phone">
          <el-input placeholder="请输入导游电话" v-model="form.phone" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="refreshIdApp">重置</el-button>
        </el-form-item>
      </el-form>
      <el-divider />
      <el-form label-position="top" :model="formItem">
        <h2>查询导游信息</h2>
        <el-form-item label="导游证号报备状态查询">
          <el-input placeholder="请输入导游证号" v-model="formItem.userIdItem" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
// import { getAliOCR } from '@/api/ocr'

//字段定义
const form = ref({
  idName: '',
  name: '',
  num: '',
  userId: '',
  phone: '',
  idCardSrc: ''
})
const formRef = ref()
const formItem = ref({
  userIdItem: ''
})
const idCardInput = ref(null)
const preImg = ref(null)
const loading = ref(false)
const rules = ref({
  idName: [
    {
      required: true,
      message: '名称不能为空',
      trigger: 'blur'
    }
  ],
  userName: [
    {
      required: true,
      message: '姓名不能为空',
      trigger: 'blur'
    }
  ],
  idCard: [
    {
      required: true,
      message: '身份证不能为空',
      trigger: 'blur'
    },
    {
      min: 18,
      max: 18,
      message: '身份证格式错误，请检查',
      trigger: 'blur'
    }
  ],
  userId: [
    {
      required: true,
      message: '导游证号不能为空',
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: true,
      message: '电话号码不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
      message: '手机号码不正确',
      trigger: 'blur'
    }
  ]
})

//提交事件
const onSubmit = async () => {
  //表单校验
  await formRef.value?.validate().catch((err) => {
    ElMessage.error('表单校验失败...')
    throw err
  })
}

//身份证上传
const uploadIdCard = () => {
  const url = URL.createObjectURL(idCardInput.value.files[0])
  form.value.idCardSrc = url
  //传入base64
  preImg.value.addEventListener('load', () => {
    let base64Data = getBase64Image(preImg.value)
    getIdCard(base64Data)
  })
}

//base64转换
const getBase64Image = (img) => {
  let canvas = document.createElement('canvas')
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  let ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)
  let dataUrl = canvas.toDataURL('image/png')
  //剔除base64编码头
  let noPrefix = dataUrl.replace(/^data:image\/\w+;base64,/, '')
  return noPrefix
}

//ocr接口封装
const getIdCard = (image) => {
  loading.value = true
  let httpUrl = 'https://cardnumber.market.alicloudapi.com/rest/160601/ocr/ocr_idcard.json'
  let data = {
    image: image
  }
  let config = {
    headers: {
      Authorization: 'APPCODE 84d2a551d3524506a4a5a417a82c13e4',
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
  axios.post(httpUrl, data, config).then((res) => {
    // console.log('res===>', res)
    form.value = res.data
    loading.value = false
    ElMessage({
      message: '识别成功，信息已填入。',
      type: 'success'
    })
  })
}

const refreshIdApp = () => {
  location.reload()
}
</script>

<style lang="scss" scoped>
.form {
  background-color: #e9e9eb;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .item {
    width: 600px;
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    .el-form-item {
      margin-top: 20px;
    }
    .el-button {
      width: 120px;
      margin-top: 10px;
    }
  }
}
</style>
