<template>
    <el-container>
        <homeAside></homeAside>
        <el-container id="mainsec">
            <homeHeader></homeHeader>
            <el-main>
                <!-- 选择器 -->
                <!-- multiple	是否多选
                        filterable	Select 组件是否可筛选
                        remote	其中的选项是否从服务器远程加载
                        loading	是否正在从远程获取数据
                        reserve-keyword	当 multiple 和 filter被设置为 true 时，是否在选中一个选项后保留当前的搜索关键词
                        remote-method	自定义远程搜索方法
                    -->
                <el-select v-model="value" filterable default-first-option clearable remote reserve-keyword
                    placeholder="请输入姓名开始搜索" :remote-method="remoteMethod" :loading="loading" @change="handleChange">
                    <el-option v-for="item in options" :key="item" :value="item" />
                </el-select>


                <!-- 表格 -->
                <el-table :data="tableData" border style="width: 100%" v-loading="loading">
                    <el-table-column prop="headimgurl" label="头像" width="130px" align="center">
                        <template #default="{ row, $index }">
                            <el-image style="width: 50px; height: 50px" :src="row.headimgurl" :zoom-rate="1.2"
                                :preview-src-list="srcList" :initial-index="$index" fit="cover" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="130px" align="center">
                    </el-table-column>
                    <el-table-column prop="class" label="班级" width="130px" align="center">
                    </el-table-column>
                    <el-table-column prop="productUrl" label="项目" align="center">
                    </el-table-column>
                    <el-table-column prop="cTime" label="创建时间" align="center">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <!-- button组件 -->
                        <el-button type="primary" @click="handleMod" v-has:edit="permission">编辑</el-button>
                        <el-button type="success" @click="handleAdd" v-has:add="permission">增加</el-button>
                        <el-button type="danger" @click="handleDel" v-has:delete="permission">删除</el-button>
                    </el-table-column>
                </el-table>

                <!-- 分页器 -->
                <el-pagination background layout="prev, pager, next" :total="1000" />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
//引入api
import * as api from '../api/homeMainApi.js'
//引入组件
import homeAside from '../components/home/homeAside.vue'
import homeHeader from '../components/home/homeHeader.vue'
//引入
import { onMounted, ref, watch } from 'vue';
//引入store
import useStore from '../store/index'
import { storeToRefs } from 'pinia'
//--------------------------表格的逻辑--------------------------------------
let store = useStore()

//封装请求表格数据的api
let tableData = ref([])
let handleTableData = async (val) => {
    let obj = {
        page: 1,
        count: 5
    }
    try {
        //开启loading
        loading.value = true
        let res = await api.getTableData(obj)
        tableData.value = res.data.data
        // console.log(tableData.value);
        //开启loading
        loading.value = false
    } catch (e) {
        console.log(e);
        //开启loading
        loading.value = false
    }
}
onMounted(() => {
    //table数据函数调用
    handleTableData()
    console.log(store.permission);
})


//图片
const srcList = ref([])
watch(tableData, (newVal) => {
    console.log(newVal);
    srcList.value = newVal.map(item => item.headimgurl)
})

//按钮鉴权
let vHas = {
    mounted(el, binding) {
        console.log(binding);
        let { permission:{value:{buttons}} } = store
        let res = buttons.includes(binding.arg)
        console.log(res);
        if (!res) {
            el.disabled = true
        }
    }
}



// ------------------------选择器的逻辑----------------------------------------
const list = ref([])
const options = ref([])
const value = ref([])
const loading = ref(false)

//封装搜索api
let states = ref([])
let handleState = async (query, flag = false) => {
        let obj = {
            key: query,
            page: 1
        }
        //调用请求
        try {
            //开启loading
            loading.value = true
            let res = await api.getStates(obj)
            // console.log(res);
            states.value = res.data.data
            // console.log(states.value);
            flag && (tableData.value = res.data.data)
            console.log(tableData.value);

            //拿取后台模糊搜索结果，处理数据
            options.value = states.value.map((item) => item.name)
            // console.log(options.value);
            //去重
            options.value = Array.from(new Set(options.value))
            // console.log(options.value);

            //关闭loading
            loading.value = false


        } catch (e) {
            console.log(e);
            //关闭loading
            loading.value = false
        }
    }
//触发远程搜索
const remoteMethod = (query) => {
        if (query) {
            // console.log(query);
            handleState(query)
        } else {
            options.value = []
        }
    }

let handleChange = (val) => {
        // console.log(val);
        handleState(val, true)
    }

</script>


<style scoped>
.common-layout,
.el-container {
    height: 100%;
}

.el-header,
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    /* text-align: center;
    line-height: 160px; */
}

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

#mainsec {
    display: block;
}

.el-select {
    margin-bottom: 20px;
}

.cell .el-button {
    width: 60px;
    font-size: 14px;
}

.el-input__wrapper {
    width: 500px;
}
.el-main table button[disabled] {
    background-color: #ccc;
    border: none;
}

.el-main table button[disabled]:hover {
    box-shadow: none;
    cursor: not-allowed;
}
</style>