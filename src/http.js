
import axios from 'axios'
import errorHandle from './errorHandle'
import dataType from './dataType'
import md5 from 'js-md5'

axios.defaults.withCredentials = true

export default class http{
    constructor(){
        this.api = '/api/court'
        // this.api = '/api/court_app'
        // this.api = '/api/chinaCourt'
        this.errorObj = new errorHandle()
        this.defaultCookie = ['openid=oR_qexL17fcNPVkLyzOKOdpucCQc']
        this._dataType = new dataType()
    }
    headersHand(options){
        options = options || {}
        options.headers = options.headers || {}
        let contentType = 'application/x-www-form-urlencoded; charset=UTF-8'
        if(options.headers['Content-Type']) contentType = options.headers['Content-Type']
        options.headers['Content-Type'] = contentType
        return options
    }
    async request(type, options){
        if(options.uploadFile) return this.requestUpload(type, options)
        type = type || 'court'
        if(!this[type + 'SendCode']) return
        options.data = options.data || {}
        // options.data = this.setCommonParams(options.data)
        // options.data = this.getRequestData(options.data)
        options = this.headersHand(options)
        if(options.method != 'GET' && options.method != 'get'){
            let contentType = options.headers['Content-Type']
            console.log(contentType)
            if(contentType != 'application/json;charset=UTF-8'){
                let params = new URLSearchParams();
                for(var i in options.data){
                    params.append(i, options.data[i])
                }
                options.data = params;
            }else{
                console.log('to string')
                options.data = JSON.stringify(options.data)
            }
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
        console.log(options)
        let res = await axios(options)
        return res
    }
    errorInput(res){
        console.log(this._dataType.deepCopy(res))
        this.errorObj.handleRes(res)
    }
    getRequestData(options){
        options = options || {}
        let token = '1st2aQaNTQsZmkJE6b2AaNhDDyoAYc7Qhp/gGPry8XglbkJC6tk4VqeOtLmwpw1Q'
        let secretKey = 'c60bc58335045d0d432a516e849c3053'
        let noEncrypt = ''
        let nonce = this.getNonce() + ''
        // let nonce = '1454136746'
        let timestamp = (new Date()).getTime() + ''
        console.log(timestamp)
        let sign = md5(timestamp + token + nonce)
        sign = sign.toUpperCase()
        // secretKey=zFSvNBoaBT1wW43o9RsSSxkRAMuwO6GwzqO+Ld+xtNxMst8eDTCZ178yDnMf7wlT
        // token=1st2aQaNTQsZmkJE6b2AaNhDDyoAYc7Qhp/gGPry8XglbkJC6tk4VqeOtLmwpw1Q
        // JSESSIONID=F9D48EEC049DF2EDCD494717B596BEAB; Path=/TennisCenterInterface/; HttpOnly
        return {
            ...options,
            token,
            secretKey,
            noEncrypt,
            nonce,
            timestamp,
            sign,
        }
    }
    getNonce(num){
        num = num || 10
        let n = '1'
        for(let i = 1; i <= num; i++){
            n = n + '0'
        }
        let data = Math.random()
        data = parseInt(data * n)
        console.log(data)
        return data
    }
}