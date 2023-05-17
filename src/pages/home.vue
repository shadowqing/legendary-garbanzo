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



                <!-- 下载excel -->
                <el-button @click="handleExcel" id="excelButton">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-excel"></use>
                    </svg>
                    Excel下载
                </el-button>

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
                <!-- layout	组件布局，子组件名用逗号分隔
                     total	总条目数
                     page-size	每页显示条目个数
                -->
                <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
                    @current-change="handleCurrentChange" :current-page="pages" />
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
//引入excel插件
import qee from "qf-export-excel"

//--------------------------flag--------------------------------------
const loading = ref(false)


//-------------------------excel的逻辑---------------------------------------
let titleList = [
    {
        title: '头像',
        key: 'headimgurl'
    },
    {
        title: '姓名',
        key: 'name'
    },
    {
        title: '班级',
        key: 'class'
    },
    {
        title: '项目',
        key: 'productUrl'
    },
    {
        title: '创建时间',
        key: 'cTime'
    }
]
let handleExcel = () => {
    qee(titleList, tableData.value, '项目表格')
}

//-------------------------分页器的逻辑---------------------------------------
let total = ref('')
let pageSize = ref(4)//每页多少条
let pages = ref('')//第多少页

//api触发条件+参数:用户选择到某页时触发，返回页码
let handleCurrentChange = (val) => {
    // console.log(val);
    pages.value = val
    console.log(pages.value);
    console.log('当前的table', tableData.value);
    //传入用户选中的字段，flag，以及用户传递的页码
    handleState(select.value, true, val)
}



//--------------------------表格的逻辑--------------------------------------
let store = useStore()

//封装api---表格数据
let tableData = ref([])
let handleTableData = async (pages) => {
    let obj = {
        page: pages,//后台第几页
        count: pageSize.value,//后台21条
        class: ''
    }
    try {
        //开启loading
        loading.value = true
        //调用表格请求api
        let res = await api.getTableData(obj)
        console.log(res);
        //获取表格展示数据
        tableData.value = res.data.data
        console.log(res.data.data);
        //分页器赋值
        total.value = res.data.total
        // console.log(total.value);

        //关闭loading
        loading.value = false
    } catch (e) {
        console.log(e);
        //关闭loading
        loading.value = false
    }
}
onMounted(() => {
    //api调用-----表格数据
    handleTableData()
    // console.log(store.permission);
})

//表格中头像
const srcList = ref([])
watch(tableData, (newVal) => {
    // console.log(newVal);
    srcList.value = newVal.map(item => item.headimgurl)
})

//表格中按钮鉴权
let vHas = {
    mounted(el, binding) {
        // console.log(binding);
        let { permission: { value: { buttons } } } = store
        let res = buttons.includes(binding.arg)
        // console.log(res);
        if (!res) {
            el.disabled = true
        }
    }
}



// ------------------------选择器的逻辑------------------------------------
const options = ref([])
const value = ref([])

//封装api----模糊搜索
let states = ref([])
let handleState = async (query, flag = false, pageselect) => {
    let obj = {
        key: query,
        page: 1,
        count: pageSize.value
    }
    pageselect && (obj.page = pageselect)
    //调用请求
    try {
        //开启loading
        loading.value = true

        //调用api
        let res = await api.getStates(obj)
        console.log(res);
        //拿取数据----赋值给选择器
        states.value = res.data.data
        //拿取用户选中字段返回的total
        total.value = res.data.total

        //拿取数据----赋值给表格
        flag && (tableData.value = res.data.data)

        //拿取后台模糊搜索结果，处理数据
        options.value = states.value.map((item) => item.name)
        options.value = Array.from(new Set(options.value))


        //关闭loading
        loading.value = false
    } catch (e) {
        console.log(e);
        //关闭loading
        loading.value = false
    }
}
//api触发条件+参数:用户在选择器实时输入的值
const remoteMethod = (query) => {
    if (query) {
        //调用api----选择器数据
        handleState(query)
    } else {
        options.value = []
    }
}
//api触发条件+参数:用户在选择器中进行选择，返回的选择值
let handleChange = (val) => {
    // console.log('handleChange');
    // console.log(pages.value);
    pages.value = 1
    select.value = val
    handleState(val, true)
}
let select = ref('')    //用户选择的值



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
    width: 300px;
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

#excelButton{
    position: fixed;
    right: 20px;
}


</style>