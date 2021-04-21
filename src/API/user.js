

import localData from '../localData'
import dataType from '../dataType'
import http from '../http'

export default class userStatus{
    constructor(){
        this._localData = new localData()
        this._dataType = new dataType()
        this.http = new http()
    }
    async statusCheck(){
        let user = this._localData.getItem('user')
        if(!user) return false
        try{
            user = JSON.parse(user)
        }catch(e){
            user = false
        }
        if(!user || !this._dataType.isObject(user)) return false
        return true

    }
    async sendSmsCode(phone){
        let options = {
            url: '/TennisCenterInterface/umUser/getPhoneCode.action',
            data: {
                loginname: phone,
                type: 3
            },
            method: 'GET'
        }
        let res = await this.http.request('court', options)
        return res
    }
    async login(phone, code, password){
        let options = {
            url: '/TennisCenterInterface/umUser/userLogin.action',
            data: {
                loginname: phone,
                password: password,
                code: code
            },
            method: 'GET'
        }
        let res = await this.http.request('court', options)
        if(res && res.respCode == '1001'){
            options = {
                url: '/TennisCenterInterface/umUser/judgeWXuser.action',
                method: 'POST'
            }
        let resUser = await this.http.request('court', options)
        if(resUser && resUser.respCode == '1001'){
            res.datas.user.openId = resUser.datas.openid
        }
        this.loginSet(res.datas)
            this.userCardGet()
        }
        return res
    }
    loginSet(data){
        if(!data) return
        let user = data.user
        this._localData.setItem({
            'loginData': JSON.stringify(data),
            'user': JSON.stringify(user)
        })
    }
    cardSet(data){
        if(!data) return
        this._localData.setItem({
            'card': JSON.stringify(data)
        })
    }
    getUserId(){
        let user = this._localData.getItem('user')
        if(!user) return null
        try{
            user = JSON.parse(user)
        }catch(e){
            user = null
        }
        if(!user) return null
        return user.id
    }
    async userCardTypeCodeGet(){
        let card = this._localData.getItem('card')
        if(!card){
            await this.userCardRequest()
            card = this._localData.getItem('card')
        }
        try{
            card = JSON.parse(card)
        }catch(e){
            card = null
        }
        if(!card) return -1
        return card.cardtypecode === undefined ? -1 : card.cardtypecode
    }
    async userCardGet(){
        await this.userCardRequest()
        let card = this._localData.getItem('card')
        try{
            card = JSON.parse(card)
        }catch(e){
            card = null
        }
        return card
    }
    async userCardRequest(userid){
        console.log('userCardRequest')
        userid = userid || this.getUserId()
        if(userid === null) return 
        let options = {
            url: '/TennisCenterInterface/umCard/getCardByUser.action',
            data: {
                userid: userid,
            },
            method: 'POST'
        }
        let res = await this.http.request('court', options)
        if(res && res.respCode == '1001'){
            this.cardSet(res.datas)
        }
        return res
    }
    async judgeWXuser(){
        let options = {
            url: '/TennisCenterInterface/umUser/judgeWXuser.action',
            method: 'POST'
        }
        let res = await this.http.request('court', options)
        if(res && res.respCode == '1001'){
            return res.datas
        }
        return false
    }
    // /TennisCenterInterface/umUser/judgeWXuser.action 
    // async login(){
    //     return {
    //         respCode: '1001',
    //         msg: ''
    //     }
    // }
}