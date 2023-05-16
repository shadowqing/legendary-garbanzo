<template>
    <el-header>
        <div id="usermsg">
            <img :src='headimg'>
            <h4>{{nick}}</h4>
        </div>
        
        <!-- 退出按钮 -->
        <el-button @click="quit">退出登录</el-button>
    </el-header>
</template>

<script setup>
//引入router
import { useRouter } from 'vue-router'
//引入ref
import {  ref,onMounted } from 'vue'
//引入store
import useStore from '../../store/index'
//使用store
let store = useStore()
//使用router
let router = useRouter()
//用户头像和名称
let headimg = ref('')
let nick = ref('')


//挂载获取用户信息
onMounted(() => {
    let { userInfo } = store
    let { value: { nickname, headimgurl } } = userInfo
    // console.log(nickname);
    nick.value = nickname
    headimg.value = headimgurl
})
//退出事件
let quit = () => {
    sessionStorage.setItem('tk', '')
    router.push('/login')
}
</script>




<style scoped>
.el-header{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    
}

.el-header #usermsg{
    display: flex;
    align-items: center;
}
.el-header img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
    display: block;
}
.el-button{
    position: absolute;
    right: 30px;
}
</style>