//引入axios，配置拦截器
import axios from 'axios'

//引入进度条
import nProgress from 'nprogress'


let http = axios.create({
    baseURL: '/api',
    timeout: 1000 * 10
})

http.interceptors.request.use(config => {
    //进度条
    nProgress.start()
    // console.log(config);
    let token = sessionStorage.getItem('tk')
    config.headers.authorization = token
    return config
})

http.interceptors.response.use(config => {
    //进度条
    nProgress.done()
    if (config.data.state) {
        return config
    } else {
        return Promise.reject(config.data.state)
    }
    return config
})

export default http