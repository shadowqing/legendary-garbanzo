<template>
    <div class="common-layout">

        <el-container class="list">
            <!-- 头部 -->
            <el-header>
                <div class="details">详情</div>
                <div class="img_name">
                    <div class="headimg">
                        <img alt="" :src="headimg">
                    </div>
                    <div class="nickname">{{ nick }}</div>
                </div>
                <button @click="quit" id="quitButton">退出</button>
            </el-header>
            <!-- body -->
            <el-container>
                <!-- left -->
                <el-aside width="200px">Aside</el-aside>
                <!-- right -->
                <el-main>
                    <table>
                        <tr>
                            <th>姓名</th>
                            <th>头像</th>
                            <th>班级</th>
                            <th>城市</th>
                            <th>操作</th>
                        </tr>

                        <tr v-for="(item, index) in listView" :key="index">
                            <td>{{ item.name }}</td>
                            <td>
                                <img :src="item.headimgurl" alt="" width="50px">
                            </td>
                            <td>{{ item.class }}</td>
                            <td>{{ item.city }}</td>
                            <td>
                                <button type="read" v-has:read="permission">查看</button>
                                <button type="edit" v-has:edit="permission">编辑</button>
                                <button type="add" v-has:add="permission">增加</button>
                                <button type="delete" v-has:delete="permission">删除</button>
                            </td>
                        </tr>
                    </table>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script setup>
//引入router
import { useRouter } from 'vue-router'
//引入mount
import { onMounted, ref } from 'vue'
//引入请求form渲染数据的api
import { formDataApi } from '@/api/index'
//引入store
import useStore from '../store/index'
let store = useStore()

let listView = ref([])
//用户头像和名称
let headimg = ref('')
let nick = ref('')

//使用router
let router = useRouter()


onMounted(() => {
    formDataApi().then(res => {
        // console.log(res.data);
        listView.value = res.data.data
        // console.log(listView.value);
    })

    let { userInfo} = store
    // headimgurl.value=userInfo.value.headimgurl
    // nickname.value=userInfo.value.nickname
    // console.log(userInfo);
    let { value: { nickname, headimgurl } } = userInfo
    // console.log(nickname);
    nick.value = nickname
    headimg.value = headimgurl



})

let vHas = {
    mounted(el,binding){
        // console.log(binding);
        let {  permission } = store
        // console.log(permission);
        //获取permission
        let { value: { buttons } } = permission
        // console.log(buttons);
        let res =buttons.includes(binding.arg)
        console.log(res);
        if(!res){
            el.disabled = true
        }
    }
}
let quit = () => {
    sessionStorage.setItem('tk', '')
    router.push('/login')
}
</script>

<style scoped>
.el-header,
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-header {
    height: 60px;
    background-color: #3c3b3f;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.el-header :deep(.details) {
    margin-left: 40px;
}

.el-header :deep(.img_name) {
    display: flex;
    align-items: center;
}

.el-header .img_name .nickname {
    margin: 0 30px;
}

.el-header :deep(img) {
    display: block;
    width: 50px;
}

.el-header #quitButton {
    width: 50px;
}

.el-aside {
    background-color: #949397;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 160px;
}
.el-main button{
    width: 50px;
    height: 30px;
    margin-right: 5px;
}
.el-main table {
    border: 1px solid #e6e6e6;
    width: 100%;
    margin-top: 10px;
    border-collapse: collapse;
}

.el-main td,
.el-main th {
    border: 1px solid #e6e6e6;
    text-align: center;
    height: 40px;
}

.el-main tr img {
    width: 50px;
}

.el-main table button {
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
}

.el-main table button:hover {
    box-shadow: 1px 1px 6px rgb(151, 151, 151);
}

.el-main table button[type="read"] {
    background-color: #409eff;
}

.el-main table button[type="edit"] {
    background-color: #e6a23c;
}

.el-main table button[type="add"] {
    background-color: #3ac2be;
}

.el-main table button[type="delete"] {
    background-color: rgb(205, 68, 68);
}

.el-main table button[disabled] {
    background-color: #ccc;
}

.el-main table button[disabled]:hover {
    box-shadow: none;
    cursor: not-allowed;
}


/* /////////////////// */
body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>



<!-- 
header {
    height: 60px;
    background-color: #3c3b3f;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

header .details {
    margin-left: 40px;
}

header .img_name {
    display: flex;
    align-items: center;
}

header .img_name .nickname {
    margin: 0 30px;
}

header img {
    display: block;
    width: 50px;
}

main table {
    border: 1px solid #e6e6e6;
    width: 100%;
    margin-top: 10px;
    border-collapse: collapse;
}

main td,
main th {
    border: 1px solid #e6e6e6;
    text-align: center;
    height: 40px;
}

main tr img {
    width: 50px;
}

main table button {
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
}

main table button:hover {
    box-shadow: 1px 1px 6px rgb(151, 151, 151);
}

main table button[type="read"] {
    background-color: #409eff;
}

main table button[type="edit"] {
    background-color: #e6a23c;
}

main table button[type="add"] {
    background-color: #67c23a;
}

main table button[type="delete"] {
    background-color: rgb(205, 68, 68);
}

main table button[disabled] {
    background-color: #ccc;
}

main table button[disabled]:hover {
    box-shadow: none;
    cursor: not-allowed;
} -->
