//引入axios公共配置
import http from '../utils/index'

//table展示数据
/**
 * 
 * @param {page,count,class} params 
 * @returns 
 */
export let getTableData = (params) =>http.get('/students/getstulist',{
    params
})

//选择器展示数据
/**
 * 
 * @param {key,count,page} params 
 * @returns 
 */
export let getStates=(params)=>http.get('/students/searchstu',{
    params
})


//增加学员信息
export let addStuMsg= (params) =>http.post('/students/addstu',params)

//删除学员信息
export let delStuMsg= (params) =>http.get('/students/delstu',{
    params
})

//修改学员信息
export let modStuMsg=(params)=>http.get('/students/updatestu',{
    params
})

//上传学员头像
/**
 * 
 * @param {headimgurl} params 
 * @returns 
 */
export let postAvatar= (params) =>http.post('/students/uploadStuAvatar',params)