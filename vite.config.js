import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//引入path
import path from "path"
//使用path方法,解析文件路径
let _resolve=(dir)=>{
  return path.resolve(dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //vite代理配置-proxy代理
  server:{
    //重置端口号
    port:8080,
    proxy:{
      "/api":{
        //目标服务器
        target:"http://chst.vip",
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/api/,""),
      }
    }
  },

  //配置别名
  resolve:{
    alias:{
      //设置别名,指向src的绝对路径
      "@":_resolve('src')
    }
  }
})
