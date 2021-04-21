

import localData from '../localData'
import dataType from '../dataType'

export default class userStatus{
    constructor(){
        this.localData = new localData()
        this.dataType = new dataType()
    }
    async statusCheck(){
        let user = this.localData.getItem('user')
        if(!user) return false
        try{
            user = JSON.parse(user)
        }catch(e){
            user = false
        }
        if(!user || !this.dataType.isObject(user)) return false
        return true

    }
}