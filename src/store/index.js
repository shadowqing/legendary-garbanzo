import {defineStore} from 'pinia'
import {ref} from 'vue'
export default defineStore('rootStore',()=>{
    let msg=ref('')
    return {msg}
})