//引入axios公共配置
import http from '../utils/index'

//table展示数据
export let getTableData = () =>http.get('/students/getstulist')

//选择器展示数据
export let getStates=(params)=>http.get('/students/searchstu',{
    params
})