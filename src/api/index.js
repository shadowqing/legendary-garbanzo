// 请求接口

/**
 * jsdoc
 * @param {String} username 用户名
 * @param {String} password 密码
 * @returns {Promise} 一个promise对象
 */

//引入axios公共配置
import http from '../utils/index'

//请求验证码展示
export let axiosCaptcha=()=>http.get('/users/getCaptcha?v=next')


//根据用户输入的验证码验证是否正确
export let captchaReturn=(captcha)=>http.get('/users/verifyCaptcha?captcha='+captcha)



//请求登录
export let loginApi = (username, password) =>http.post('/users/login',{username,password})

//请求主页渲染数据
export let formDataApi=()=>http.get('/students/getstulist')
                