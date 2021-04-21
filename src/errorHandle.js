import { Notify } from 'vant';
import dataType from './dataType'

export default class errorHandle{
    constructor(){
        this._Notify = Notify
        this._dataType = new dataType()
    }
    handleRes(res){
        let msg = '未知错误'
        res = res || {}
        if(this._dataType.isObject(res) && res.respCode == '1001') return

        if(!this._dataType.isObject(res)) msg = '未知错误'
        if(res.respCode != '1001' && res.respMsg) msg = res.respMsg
        if(!msg) return
        this._Notify({ type: 'danger', message: msg });
    }
}