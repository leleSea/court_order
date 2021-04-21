import localData from '../localData'
import dataType from '../dataType'
import http from '../http'
import errorHandle from '../errorHandle'

export default class court{
    constructor(){
        this._errorHandle = new errorHandle()
        this._localData = new localData()
        this._dataType = new dataType()
        this._http = new http()
        this.ballcode = 1
        this.parkstatus = 0
        this.courtAreaList = [
            {
                name: 'K场',
                vid: 13,
                parktypeinfo: 3
            },
            {
                name: 'G场',
                vid: 11,
                parktypeinfo: 3
            },
            
            {
                name: 'G场草地',
                vid: 11,
                parktypeinfo: 4
            },
            {
                name: 'C场',
                vid: 2,
                parktypeinfo: 2
            },
            {
                name: 'D场',
                vid: 3,
                parktypeinfo: 3
            },
            {
                name: 'F场',
                vid: 6,
                parktypeinfo: 3
            },
            {
                name: 'P场',
                vid: 12,
                parktypeinfo: 1
            },
            
        ]
    }
    getCourtAreaList(){
        return this.courtAreaList
    }
    getBallcode(){
        return this.ballcode
    }
    getParkstatus(){
        return this.parkstatus
    }
    async getCourtList(opt){
        opt = opt || {}
        if(!Object.keys(opt).length) return false
        let options = {
            url: '/TennisCenterInterface/pmPark/getParkShowByParam.action',
            data: opt,
            method: 'POST'
        }
        let res = await this._http.request('court', options)
        if(res && res.respCode == '1001'){
            console.log(res)
            return res.datas
        }
        return false
    }
    async orderCourt(opt){
        let url = '/TennisCenterInterface/pmPark/addParkOrder.action'
        opt = opt || {}
        console.log(opt)
        if(!Object.keys(opt).length) return false
        console.log('request')
        // opt.userid = '12765'
        let options = {
            url: url,
            data: opt,
            method: 'POST'
        }
        let res = await this._http.request('court', options)
        // if(res && res.respCode == '1001'){
        //     return res.datas
        // }
        // return false
        if(res && res.respCode == '1001'){
            this._errorHandle.notifySuccess({respMsg: '预定成功'})
        }
        return res
    }
}