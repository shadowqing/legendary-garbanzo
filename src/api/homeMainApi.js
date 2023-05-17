//引入axios公共配置
import http from '../utils/index'


//模糊搜索api
/**
 * 
 * @param {key,count条目,page页码} params 
 * @returns 
 */
export let getStates=(params)=>http.get('/students/searchstu',{
    params
})


//表格数据api
/**
 * 
 * @param {page页码,count条目,class} params 
 * @returns 
 */
export let getTableData = (params) =>http.get('/students/getstulist',{
    params
})


//上传学员头像api
/**
 * 
 * @param {headimgurl} params 
 * @returns 
 */
export let postAvatar= (params) =>http.post('/students/uploadStuAvatar',params)



//增加学员信息api
export let addStuMsg= (params) =>http.post('/students/addstu',params)

//删除学员信息api
export let delStuMsg= (params) =>http.get('/students/delstu',{
    params
})

//修改学员信息api
export let modStuMsg=(params)=>http.get('/students/updatestu',{
    params
})

