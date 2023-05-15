<template>
    <div class="common-layout">
        <el-container>
            <!-- aside -->
            <homeAside></homeAside>
            <el-container id="mainsec">
                <!-- header -->
                <homeHeader></homeHeader>

                <!-- main -->
                <el-main>
                    <!-- 选择器 -->
                    <!-- multiple	是否多选
                        filterable	Select 组件是否可筛选
                        remote	其中的选项是否从服务器远程加载
                        loading	是否正在从远程获取数据
                        reserve-keyword	当 multiple 和 filter被设置为 true 时，是否在选中一个选项后保留当前的搜索关键词
                        remote-method	自定义远程搜索方法
                    -->
                    <el-select v-model="value" multiple filterable remote reserve-keyword
                        placeholder="请输入关键字开始搜索" :remote-method="remoteMethod" :loading="loading">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <!-- 表格展示 -->
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="headimgurl" label="头像" width="130px">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="130px">
                        </el-table-column>
                        <el-table-column prop="class" label="班级" width="130px">
                        </el-table-column>
                        <el-table-column prop="productUrl" label="项目">
                        </el-table-column>
                        <el-table-column prop="cTime" label="创建时间">
                        </el-table-column>
                        <el-table-column label="操作">
                            <!-- button组件 -->
                            <el-button type="primary">查看</el-button>
                            <el-button type="success">增加</el-button>
                            <el-button type="danger">删除</el-button>
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
//引入api
import * as api from '../api/homeMainApi.js'
//引入组件
import homeAside from '../components/home/homeAside.vue'
import homeHeader from '../components/home/homeHeader.vue'
//引入
import { onMounted, ref } from 'vue';

//表格的逻辑
//挂载获取展示数据，封装其函数
let tableData = ref([])
let handleTableData = async () => {
    try {
        let res = await api.getTableData()
        tableData.value = res.data.data
        // console.log(tableData.value);
    } catch (e) {
        console.log(e);
    }
}
onMounted(() => {
    //table数据函数调用
    handleTableData()
})
// ----------------------------------------------------------------

//选择器的逻辑
const list = ref([])
const options = ref([])
const value = ref([])
const loading = ref(false)

onMounted(() => {
  list.value = states.map((item) => {
    return { value: `value:${item}`, label: `label:${item}` }
  })
})



//触发搜索
const remoteMethod =async (query) => {
  if (query) {
    loading.value = true
    // console.log(query);
    let obj={
        key:query
    }
    //调用请求
    try{
        let res=await api.getStates(obj)
        console.log(res);
    }catch(e){
        console.log(e);
    }
    setTimeout(() => {
      loading.value = false
      options.value = list.value.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase())
      })
    }, 200)
  } else {
    options.value = []
  }
}

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
]

</script>


<style>
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
</style>