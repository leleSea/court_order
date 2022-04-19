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
        this.extendCourt = [
            {"park":[{"id":38,"venuesid":11,"parkname":"G1(儿童)","parkcode":null,"address":null,"remark":null,"parkstatus":0,"createuserid":null,"createtime":null,"deleteflag":0,"parktypeid":3,"sort":61,"parktypeinfo":null,"reserve":[{"detailid":"","time":7,"fixedflag":0,"interval":[],"bookmoney":100,"userid":"24392","bookstatus":1,"orderno":""},{"detailid":"","time":8,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"10664","bookstatus":1,"orderno":""},{"detailid":"","time":9,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"10664","bookstatus":1,"orderno":""},{"detailid":"","time":10,"fixedflag":0,"interval":[],"bookmoney":100,"userid":"23843","bookstatus":1,"orderno":""},{"detailid":"","time":11,"fixedflag":0,"interval":[],"bookmoney":100,"userid":"23843","bookstatus":1,"orderno":""},{"detailid":"","time":12,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":13,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":14,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":15,"fixedflag":0,"interval":[],"bookmoney":100,"userid":"24392","bookstatus":1,"orderno":""},{"detailid":"","time":16,"fixedflag":0,"interval":[],"bookmoney":80,"userid":"21054","bookstatus":1,"orderno":""},{"detailid":"","time":17,"fixedflag":0,"interval":[],"bookmoney":80,"userid":"13476","bookstatus":1,"orderno":""},{"detailid":"","time":18,"fixedflag":0,"interval":[],"bookmoney":80,"userid":"13476","bookstatus":1,"orderno":""},{"detailid":"","time":19,"fixedflag":0,"interval":[],"bookmoney":80,"userid":"19016","bookstatus":1,"orderno":""},{"detailid":"","time":20,"fixedflag":0,"interval":[],"bookmoney":90,"userid":"22602","bookstatus":1,"orderno":""},{"detailid":"","time":21,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":22,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""}],"inOrOut":null},{"id":39,"venuesid":11,"parkname":"G2","parkcode":null,"address":null,"remark":null,"parkstatus":0,"createuserid":null,"createtime":null,"deleteflag":0,"parktypeid":3,"sort":62,"parktypeinfo":null,"reserve":[{"detailid":"","time":7,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"29441","bookstatus":1,"orderno":""},{"detailid":"","time":8,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"18726","bookstatus":1,"orderno":""},{"detailid":"","time":9,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"18726","bookstatus":1,"orderno":""},{"detailid":"","time":10,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"20404","bookstatus":1,"orderno":""},{"detailid":"","time":11,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"20404","bookstatus":1,"orderno":""},{"detailid":"","time":12,"fixedflag":0,"interval":[],"bookmoney":100,"userid":"14501","bookstatus":1,"orderno":""},{"detailid":"","time":13,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"19975","bookstatus":1,"orderno":""},{"detailid":"","time":14,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"19975","bookstatus":1,"orderno":""},{"detailid":"","time":15,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"21149","bookstatus":1,"orderno":""},{"detailid":"","time":16,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"21149","bookstatus":1,"orderno":""},{"detailid":"","time":17,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"27424","bookstatus":1,"orderno":""},{"detailid":"","time":18,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"27424","bookstatus":1,"orderno":""},{"detailid":"","time":19,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"12544","bookstatus":1,"orderno":""},{"detailid":"","time":20,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"12016","bookstatus":1,"orderno":""},{"detailid":"","time":21,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"12016","bookstatus":1,"orderno":""},{"detailid":"","time":22,"fixedflag":0,"interval":[],"bookmoney":100,"userid":"17810","bookstatus":1,"orderno":""}],"inOrOut":null},{"id":63,"venuesid":11,"parkname":"G6","parkcode":null,"address":null,"remark":null,"parkstatus":0,"createuserid":null,"createtime":null,"deleteflag":0,"parktypeid":3,"sort":66,"parktypeinfo":null,"reserve":[{"detailid":"","time":7,"fixedflag":0,"interval":[],"bookmoney":90,"userid":"11290","bookstatus":1,"orderno":""},{"detailid":"","time":8,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"11668","bookstatus":1,"orderno":""},{"detailid":"","time":9,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"22642","bookstatus":1,"orderno":""},{"detailid":"","time":10,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"19595","bookstatus":1,"orderno":""},{"detailid":"","time":11,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"19595","bookstatus":1,"orderno":""},{"detailid":"","time":12,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"27518","bookstatus":1,"orderno":""},{"detailid":"","time":13,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"27518","bookstatus":1,"orderno":""},{"detailid":"","time":14,"fixedflag":0,"interval":[],"bookmoney":100,"userid":"28065","bookstatus":1,"orderno":""},{"detailid":"","time":15,"fixedflag":0,"interval":[],"bookmoney":100,"userid":"30469","bookstatus":1,"orderno":""},{"detailid":"","time":16,"fixedflag":0,"interval":[],"bookmoney":80,"userid":"28357","bookstatus":1,"orderno":""},{"detailid":"","time":17,"fixedflag":0,"interval":[],"bookmoney":80,"userid":"28357","bookstatus":1,"orderno":""},{"detailid":"","time":18,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"29441","bookstatus":1,"orderno":""},{"detailid":"","time":19,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"21149","bookstatus":1,"orderno":""},{"detailid":"","time":20,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"21149","bookstatus":1,"orderno":""},{"detailid":"","time":21,"fixedflag":0,"interval":[],"bookmoney":100,"userid":"29421","bookstatus":1,"orderno":""},{"detailid":"","time":22,"fixedflag":0,"interval":[],"bookmoney":100,"userid":"29421","bookstatus":1,"orderno":""}],"inOrOut":null}],"vid":11,"vname":"G场"},

            {"park":[{"id":40,"venuesid":11,"parkname":"G3草地","parkcode":null,"address":null,"remark":null,"parkstatus":0,"createuserid":null,"createtime":null,"deleteflag":0,"parktypeid":4,"sort":63,"parktypeinfo":null,"reserve":[{"detailid":"","time":7,"fixedflag":0,"interval":[],"bookmoney":90,"userid":"18267","bookstatus":1,"orderno":""},{"detailid":"","time":8,"fixedflag":0,"interval":[],"bookmoney":90,"userid":"18267","bookstatus":1,"orderno":""},{"detailid":"","time":9,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"25645","bookstatus":1,"orderno":""},{"detailid":"","time":10,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"25645","bookstatus":1,"orderno":""},{"detailid":"","time":11,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":12,"fixedflag":0,"interval":[],"bookmoney":100,"userid":"16232","bookstatus":1,"orderno":""},{"detailid":"","time":13,"fixedflag":0,"interval":[],"bookmoney":100,"userid":"20553","bookstatus":1,"orderno":""},{"detailid":"","time":14,"fixedflag":0,"interval":[],"bookmoney":100,"userid":"20553","bookstatus":1,"orderno":""},{"detailid":"","time":15,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"14412","bookstatus":1,"orderno":""},{"detailid":"","time":16,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"14412","bookstatus":1,"orderno":""},{"detailid":"","time":17,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":18,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":19,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"14938","bookstatus":1,"orderno":""},{"detailid":"","time":20,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"14938","bookstatus":1,"orderno":""},{"detailid":"","time":21,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":22,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""}],"inOrOut":null},{"id":55,"venuesid":11,"parkname":"G4草地","parkcode":null,"address":null,"remark":null,"parkstatus":0,"createuserid":null,"createtime":null,"deleteflag":0,"parktypeid":4,"sort":64,"parktypeinfo":null,"reserve":[{"detailid":"","time":7,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":8,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":9,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"21816","bookstatus":1,"orderno":""},{"detailid":"","time":10,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"21816","bookstatus":1,"orderno":""},{"detailid":"","time":11,"fixedflag":0,"interval":[],"bookmoney":100,"userid":"23592","bookstatus":1,"orderno":""},{"detailid":"","time":12,"fixedflag":0,"interval":[],"bookmoney":100,"userid":"17357","bookstatus":1,"orderno":""},{"detailid":"","time":13,"fixedflag":0,"interval":[],"bookmoney":100,"userid":"17357","bookstatus":1,"orderno":""},{"detailid":"","time":14,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"16061","bookstatus":1,"orderno":""},{"detailid":"","time":15,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"29268","bookstatus":1,"orderno":""},{"detailid":"","time":16,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"29268","bookstatus":1,"orderno":""},{"detailid":"","time":17,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"18649","bookstatus":1,"orderno":""},{"detailid":"","time":18,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"18649","bookstatus":1,"orderno":""},{"detailid":"","time":19,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":20,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":21,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":22,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""}],"inOrOut":null},{"id":56,"venuesid":11,"parkname":"G5草地","parkcode":null,"address":null,"remark":null,"parkstatus":0,"createuserid":null,"createtime":null,"deleteflag":0,"parktypeid":4,"sort":65,"parktypeinfo":null,"reserve":[{"detailid":"","time":7,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":8,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":9,"fixedflag":0,"interval":[],"bookmoney":100,"userid":"20668","bookstatus":1,"orderno":""},{"detailid":"","time":10,"fixedflag":0,"interval":[],"bookmoney":100,"userid":"20668","bookstatus":1,"orderno":""},{"detailid":"","time":11,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":12,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":13,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":14,"fixedflag":0,"interval":[],"bookmoney":90,"userid":"24791","bookstatus":1,"orderno":""},{"detailid":"","time":15,"fixedflag":0,"interval":[],"bookmoney":90,"userid":"24791","bookstatus":1,"orderno":""},{"detailid":"","time":16,"fixedflag":0,"interval":[],"bookmoney":120,"userid":"27718","bookstatus":1,"orderno":""},{"detailid":"","time":17,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"22621","bookstatus":1,"orderno":""},{"detailid":"","time":18,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"14894","bookstatus":1,"orderno":""},{"detailid":"","time":19,"fixedflag":0,"interval":[],"bookmoney":100,"userid":"24727","bookstatus":1,"orderno":""},{"detailid":"","time":20,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":21,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":22,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""}],"inOrOut":null}],"vid":11,"vname":"G场"},

            {"vid":13,"vname":"K场","park":[{"id":83,"venuesid":13,"parkname":"K18","parkcode":null,"address":null,"remark":null,"parkstatus":0,"createuserid":null,"createtime":null,"deleteflag":0,"parktypeid":3,"sort":108,"parktypeinfo":null,"reserve":[{"detailid":"","time":7,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"19963","bookstatus":1,"orderno":""},{"detailid":"","time":8,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"16644","bookstatus":1,"orderno":""},{"detailid":"","time":9,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"16644","bookstatus":1,"orderno":""},{"detailid":"","time":10,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"12965","bookstatus":1,"orderno":""},{"detailid":"","time":11,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":12,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"28086","bookstatus":1,"orderno":""},{"detailid":"","time":13,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":14,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":15,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":16,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":17,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"10783","bookstatus":1,"orderno":""},{"detailid":"","time":18,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"10783","bookstatus":1,"orderno":""},{"detailid":"","time":19,"fixedflag":1,"interval":[],"bookmoney":"0","userid":"27587","bookstatus":1,"orderno":""},{"detailid":"","time":20,"fixedflag":1,"interval":[],"bookmoney":"0","userid":"27587","bookstatus":1,"orderno":""},{"detailid":"","time":21,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"26731","bookstatus":1,"orderno":""},{"detailid":"","time":22,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"24747","bookstatus":1,"orderno":""}],"inOrOut":null},{"id":82,"venuesid":13,"parkname":"K17","parkcode":null,"address":null,"remark":null,"parkstatus":0,"createuserid":null,"createtime":null,"deleteflag":0,"parktypeid":3,"sort":107,"parktypeinfo":null,"reserve":[{"detailid":"","time":7,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":8,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"28065","bookstatus":1,"orderno":""},{"detailid":"","time":9,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"11982","bookstatus":1,"orderno":""},{"detailid":"","time":10,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"11982","bookstatus":1,"orderno":""},{"detailid":"","time":11,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":12,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":13,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":14,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"22559","bookstatus":1,"orderno":""},{"detailid":"","time":15,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"21333","bookstatus":1,"orderno":""},{"detailid":"","time":16,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"27652","bookstatus":1,"orderno":""},{"detailid":"","time":17,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"11567","bookstatus":1,"orderno":""},{"detailid":"","time":18,"fixedflag":0,"interval":[],"bookmoney":90,"userid":"16644","bookstatus":1,"orderno":""},{"detailid":"","time":19,"fixedflag":0,"interval":[],"bookmoney":90,"userid":"16644","bookstatus":1,"orderno":""},{"detailid":"","time":20,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"21480","bookstatus":1,"orderno":""},{"detailid":"","time":21,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"21480","bookstatus":1,"orderno":""},{"detailid":"","time":22,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""}],"inOrOut":null},{"id":81,"venuesid":13,"parkname":"K16","parkcode":null,"address":null,"remark":null,"parkstatus":0,"createuserid":null,"createtime":null,"deleteflag":0,"parktypeid":3,"sort":106,"parktypeinfo":null,"reserve":[{"detailid":"","time":7,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"29317","bookstatus":1,"orderno":""},{"detailid":"","time":8,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"10669","bookstatus":1,"orderno":""},{"detailid":"","time":9,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"10171","bookstatus":1,"orderno":""},{"detailid":"","time":10,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":11,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":12,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":13,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""},{"detailid":"","time":14,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"10736","bookstatus":1,"orderno":""},{"detailid":"","time":15,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"10736","bookstatus":1,"orderno":""},{"detailid":"","time":16,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"22479","bookstatus":1,"orderno":""},{"detailid":"","time":17,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"27652","bookstatus":1,"orderno":""},{"detailid":"","time":18,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"13745","bookstatus":1,"orderno":""},{"detailid":"","time":19,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"13745","bookstatus":1,"orderno":""},{"detailid":"","time":20,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"15271","bookstatus":1,"orderno":""},{"detailid":"","time":21,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"15271","bookstatus":1,"orderno":""},{"detailid":"","time":22,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""}],"inOrOut":null},{"id":80,"venuesid":13,"parkname":"K15","parkcode":null,"address":null,"remark":null,"parkstatus":0,"createuserid":null,"createtime":null,"deleteflag":0,"parktypeid":3,"sort":105,"parktypeinfo":null,"reserve":[{"detailid":"","time":7,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"19532","bookstatus":1,"orderno":""},{"detailid":"","time":8,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"19540","bookstatus":1,"orderno":""},{"detailid":"","time":9,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"27412","bookstatus":1,"orderno":""},{"detailid":"","time":10,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"27412","bookstatus":1,"orderno":""},{"detailid":"","time":11,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"10669","bookstatus":1,"orderno":""},{"detailid":"","time":12,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"15125","bookstatus":1,"orderno":""},{"detailid":"","time":13,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"15125","bookstatus":1,"orderno":""},{"detailid":"","time":14,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"28059","bookstatus":1,"orderno":""},{"detailid":"","time":15,"fixedflag":0,"interval":[],"bookmoney":60,"userid":"12433","bookstatus":1,"orderno":""},{"detailid":"","time":16,"fixedflag":0,"interval":[],"bookmoney":90,"userid":"23984","bookstatus":1,"orderno":""},{"detailid":"","time":17,"fixedflag":0,"interval":[],"bookmoney":90,"userid":"23984","bookstatus":1,"orderno":""},{"detailid":"","time":18,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"10689","bookstatus":1,"orderno":""},{"detailid":"","time":19,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"10689","bookstatus":1,"orderno":""},{"detailid":"","time":20,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"10793","bookstatus":1,"orderno":""},{"detailid":"","time":21,"fixedflag":0,"interval":[],"bookmoney":70,"userid":"10793","bookstatus":1,"orderno":""},{"detailid":"","time":22,"fixedflag":0,"interval":[],"bookmoney":0,"userid":"","bookstatus":2,"orderno":""}],"inOrOut":null}]}
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

    async getCheckCode(userid){
        let url = '/TennisCenterInterface/imgCaptcha/api/get.action'
        let time = (new Date()).getTime()
        let options = {
            url: url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                userid: userid
            },
            data: {
                userid: userid,
                captchaType: 'blockPuzzle',
                clientUid: 'slider-331a6d4b-b90c-4b47-824e-0c33042c8f2c',
                ts: time
            },
            timeout: 10000
        }
        let res = await this._http.request('court', options)
        return res
    }

    async checkImgCode(data){
        let url = '/TennisCenterInterface/imgCaptcha/api/check.action'
        let time = (new Date()).getTime()
        let options = {
            url: url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            data: data
        }
        let res = await this._http.request('court', options)
        return res
    }

    async queryIsCodeTime(userid){
        let url = '/TennisCenterInterface/umUser/queryIsCodeTime.action'
        let options = {
            url: url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            data: {userid}
        }
        let res = await this._http.request('court', options)
        return res
    }

    async getCode(mobile, userId){
        // mobile:mobile,
		// 		userId:userid
        // mobile:mobile,
		// 		userId:userid
        let url = '/TennisCenterInterface/umUser/getOrderCode.action'
        let options = {
            url: url,
            method: 'GET',
            // headers: {
            //     'Content-Type': 'application/json;charset=UTF-8',
            // },
            data: {userId, mobile}
        }
        let res = await this._http.request('court', options)
        if(res && res.respCode == '1001'){
            this._errorHandle.notifySuccess({respMsg: '已发送'})
        }
        return res
    }
}