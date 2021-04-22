
import axios from 'axios'
import errorHandle from './errorHandle'
import dataType from './dataType'
axios.defaults.withCredentials = true

export default class http{
    constructor(){
        // this.api = '/api/court'
        this.api = '/api/chinaCourt'
        this.errorObj = new errorHandle()
        this.defaultCookie = ['openid=oR_qexL17fcNPVkLyzOKOdpucCQc']
        this._dataType = new dataType()
    }
    async request(type, options){
        if(options.uploadFile) return this.requestUpload(type, options)
        type = type || 'court'
        if(!this[type + 'SendCode']) return
        options.data = options.data || {}
        if(options.method != 'GET' && options.method != 'get'){
            let params = new URLSearchParams();
            for(var i in options.data){
                params.append(i, options.data[i])
            }
            options.data = params;
        }else{
            let sendData = '?'
            for(i in options.data){
                sendData = sendData + i + '=' + options.data[i] + '&'
            }
            sendData = sendData.substring(0, sendData.length-1)
            options.url = options.url + sendData
        }
        options.method = options.method || 'post'
        options.timeout = options.timeout || 0
        return this[type + 'SendCode'](options)
    }
    async courtSendCode(options){
        options.url = this.api + options.url
        let res = await this.sendCode(options)
        return res
    }
    async sendCode(options){
        let res = await this.sendCodeAction(options)
        .then(res => {
            if(res && this._dataType.isObject(res) && res.data) res = res.data
            return res
        }).catch(err => {
            return err
        })
        this.errorInput(res)
        return res
    }
    async sendCodeAction(options){
        options.withCredentials = true
        let res = await axios(options)
        return res
    }
    errorInput(res){
        console.log(this._dataType.deepCopy(res))
        this.errorObj.handleRes(res)
    }
}