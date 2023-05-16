<template>
  <div id="contain">
    <video src="../video/预览视频.mp4" muted loop autoplay id="video"></video>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
      <!-- 用户名 -->
      <el-form-item label="用&ensp;户&ensp;名" prop="username">
        <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密&emsp;&emsp;码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <!-- 验证码输入区 -->
      <el-form-item label="验&ensp;证&ensp;码" prop="captcha">
        <el-input v-model="ruleForm.captcha" @keydowm.enter="submit(ruleFormRef)" />
      </el-form-item>
      <!-- 后台请求的验证码 -->
      <el-form-item>
        <div id="axiosCaptcha" v-html="axiosCaptcha" @click="getCaptcha" v-loading="flag"></div>
      </el-form-item>
      <!-- 登录 -->
      <el-form-item>
        <el-button type="submit" @click="submit(ruleFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useStore from '../store/index'
//引入api
import *as api from '../api/index'
//引入loading动画
import { ElLoading } from 'element-plus'



let router = useRouter()
let store = useStore()


//请求验证码
let axiosCaptcha = ref('')
onMounted(() => {
  // console.log(api);
  getCaptcha()

})
let flag = ref(false)
//拿取展示验证码
let getCaptcha = async () => {
  try {
    //动画
    flag.value = true
    let res = await api.axiosCaptcha()
    console.log(res);
    axiosCaptcha.value = res.data.img
    //关闭动画
    flag.value = false
  } catch (e) {
    console.log(e);
    //关闭动画
    flag.value = false
  }
}



//表单数据，拿到ruleForm
const ruleFormRef = ref()


//验证用户名方法
const validateUsername = (rule, value, callback) => {
  let reg = /^[a-zA-Z]{1,9}$/
  let res = reg.test(value)
  // console.log(res);
  if (res) {
    callback()
  } else {
    callback(new Error("请输入1-9位的字母组合"))
  }
}
//验证密码方法
const validatePassword = (rule, value, callback) => {
  if (value) {
    callback()
  } else {
    callback(new Error("请输入1-9位的数字组合"))
  }
}
// ----------------------------

//验证验证码方法
const validateCaptcha = async (rule, value, callback) => {
  if (value) {
    ruleForm.captcha = value
    callback()
  } else {
    callback(new Error("请输入验证码"))
  }
}



// ----------------------------------------------------------------
//获取输入数据
const ruleForm = reactive({
  username: '',
  password: '',
  captcha: '',
})

//集成验证
const rules = reactive({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
  captcha: [{ validator: validateCaptcha, trigger: 'blur' }],
})


//登录
const submit = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      //动画
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      //拿取验证请求
      let inputmsg = ruleForm.captcha
      console.log(inputmsg);
      let captchaReturn = async (value) => {
        // console.log(value);
        try {
          let res = await api.captchaReturn(value)
          // console.log(res,res.data.state);
          return res.data.state
        } catch (e) {
          return false
        }
      }
      // console.log(captchaReturn);
      let res = await captchaReturn(inputmsg)
      console.log(res);
      if (res) {
        //校验成功，发起请求
        // getLogin()
        let user = ruleForm.username;
        let pass = ruleForm.password
        // console.log(user,pass);
        let res = await api.loginApi(user, pass)
        // console.log(res);
        sessionStorage.setItem('tk', res.data.token)
        store.userInfo.value = res.data.userInfo
        store.permission.value = res.data.permission
        // console.log(store.userInfo.value);
        router.push('/home')
      }
      loading.close()
    } else {
      console.log('error submit!')
      //关闭动画
      loading.close()
      return false
    }
  })
}

</script>



<!-- css模块 -->
<style scoped>
/* 后台请求验证码展示区 */
#axiosCaptcha {
  width: 160px;
  height: 60px;
  /* border: 1px solid black; */
  background-color: #fff;
}

/* label */
:deep(.el-form-item__label) {
  color: #fff;
  padding: 0 8px 0 0;
  text-align: center;
  width: 68px !important;
}

#contain {
  width: 100%;
  height: 100%;
}

#contain #video {
  /* z-index: -1; */
  /* width: 100%;
  height: 100%; */
  position:fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.demo-ruleForm {
  position: absolute;
  right: 10%;
  bottom: 25%;
  width: 350px;
  height: 400px;
  background-color: #50615d;
  /* background-image: url(../img/集体照.webp); */
  background-size: cover;
  border-radius: 10px;
  box-shadow: 5px 5px 35px #92ada5;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #fff;
  z-index: 9;
}



.demo-ruleForm .login :deep(.el-form-item__label) {
  color: #fff;
  font-size: 16px;
}

.demo-ruleForm .login {
  display: flex;
  justify-content: center;
  /* flex-direction: column; */
  align-items: center;

}

/* 登录 */
:deep(.el-form-item__content) {
  margin-left: 10px !important;
}

.el-form-item__content .el-button {
  width: 300px;
  height: 35px;
  margin-top: 40px;
  border: 0;
  background-color: #73e8ca;
  border-radius: 6px;
  font-size: 18px;
}

.el-form-item__content .el-input {
  height: 30px;
  border: 0;
  outline: none;
  font-size: 18px;
  border-radius: 5px;
}

:deep(.el-form-item__error) {
  color: #eef56c
}


</style>