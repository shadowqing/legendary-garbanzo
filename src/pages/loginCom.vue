<template>
    <div id="login_content">
        <video loop="loop" muted="muted" autoplay="autoplay"  src="../video/潮点网_64041 2.mp4" style="width:100%"></video>

        <h1>欢迎来到仙剑世界!</h1>

        <!-- form盒子 -->
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
            <!-- 用户名 -->
            <el-form-item label="用&ensp;户&ensp;名" prop="user" class="login">
                <el-input v-model="ruleForm.user" type="username" autocomplete="off" />
            </el-form-item>
            <!-- 用户密码 -->
            <el-form-item label="密&emsp;&emsp;码" prop="pass" class="login">
                <el-input v-model="ruleForm.pass" type="username" autocomplete="off" />
            </el-form-item>
            <!-- 验证码 -->
            <el-form-item label="验&ensp;证&ensp;码" prop="check" class="login">
                <el-input v-model.number="ruleForm.check" />
            </el-form-item>
            <!-- 登录按钮 -->
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()
//验证码验证
const validateCheck = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('Please input the check'))
    }
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'))
        } else {
            if (value < 18) {
                callback(new Error('checkPass must be greater than 18'))
            } else {
                callback()
            }
        }
    }, 1000)
}
//用户名验证
const validateUser = (rule: any, value: any, callback: any) => {
    let reg = /^([a-z]{1}[a-zA-Z\d]{1,9})$/
    if (reg.test(value)) {
        callback()
    } else {
        callback('请输入1-9位用户名')
    }
}
//密码验证
const validatePass = (rule: any, value: any, callback: any) => {
    let reg = /^([0-9]{4,9})$/
    if (reg.test(value)) {
        callback()
    } else {
        callback('请输入4-9位数字密码')
    }
}

const ruleForm = reactive({
    user: '',
    pass: '',
    check: '',
})

//验证方式
const rules = reactive<FormRules>({
    user: [{ validator: validateUser, trigger: 'blur' }],
    pass: [{ validator: validatePass, trigger: 'blur' }],
    check: [{ validator: validateCheck, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style scoped>
#login_content :deep(h1) {
    position: absolute;
    left: 10%;
    top: 25%;
    color: #fff;
    opacity: .7;
}

#login_content {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-image: linear-gradient(90deg, #3C3B3F, #605c3c);
}

.demo-ruleForm {
    position: absolute;
    right: 10%;
    bottom: 25%;
    width: 350px;
    height: 400px;
    /* background-color: #d2edf1; */
    background-image: url(../img/集体照.webp);
    background-size: cover;
    border-radius: 10px;
    box-shadow: 1px 1px 35px #fff;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: #fff;
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

:deep(.el-form-item__content) {
    margin: 0 !important;
}

.el-form-item__content .el-button {
    width: 300px;
    height: 35px;
    margin-top: 40px;
    border: 0;
    background-color: #2BC0E4;
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
}</style>
