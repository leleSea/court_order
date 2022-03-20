<!--  -->
<template>
    <div class='page-index'>
		<div class="area-box">
			<van-button class="order-btn order-spec" type="primary" @click="orderCourt" block :disabled="orderDisabled">预定</van-button>
			<van-button class="order-btn" type="primary" @click="orderCourtInterval" block >定时预定</van-button>
			<van-button class="order-btn" type="primary" @click="orderCourtImmdia" block >立即预定</van-button>
			<van-button class="order-btn" type="primary" @click="orderStop" block >停止</van-button>
		</div>
		<div class="time-area"></div>
        <div class="date-box">
            <van-grid :column-num="4">
                <van-grid-item v-for="(v, i) in dateNav" :key="i" :class="{'selected': selectDateVal == i}" @click="changeSelect(i)">
					<div class="txt">{{v.weekday}}</div>
					<div class="txt">{{v.date}}</div>
				</van-grid-item>					
            </van-grid>
        </div>
		<div class="court-area-box">
			<van-tabs v-model="courtAreaVal" @change="courtAreaChange">
				<van-tab v-for="(v, i) in courtAreaList" :key="i" :title="v.name"></van-tab>
			</van-tabs>
			<!-- <van-grid :column-num="7">
                <van-grid-item v-for="(v, i) in courtAreaList" :key="i">
					<div class="txt">{{v.name}}</div>
				</van-grid-item>					
            </van-grid> -->
		</div>
		<div class="court-box">
			<ul class="court-item a">
				<li class="item per"></li>
				<li class="item" v-for="v in courtTimeList" :key="v">
					<span class="txt">{{v}}</span>
				</li>
			</ul>
			<div class="court-item b">
				<!-- <div class="item-court-name"></div>
				<div class="item-court-list">
					<van-grid :column-num="8">
						<van-grid-item v-for="(v, i) in dateNav" :key="i" :class="{'selected': selectDateVal == i}" @click="changeSelect(i)">
							<div class="txt">{{v.weekday}}</div>
							<div class="txt">{{v.date}}</div>
						</van-grid-item>					
					</van-grid>
				</div> -->
				<ul class="b-content" v-for="v in courtContent" :key="v.id">
					<li class="head">
						<span class="txt">{{v.parkname}}</span>
					</li>
					<li class="con-list-item status" v-for="s in v.reserve" :key="s.time" 
					@click="selectCourt(s, v)"
					:class="{'avai': s.bookstatus == 0 && !selectCourtDataObj[`${v.parkname}-${s.time}`], 
					'unavai': s.bookstatus != 0 && s.courtUserid != userid, 
					'order': s.bookstatus != 0 && s.courtUserid == userid, 
					'order': selectCourtDataObj[`${v.parkname}-${s.time}`]}" :data-val="`${v.parkname}-${s.time}`">
						<div class="item-body">
							<van-icon class="order-icon" name="success" v-if="selectCourtDataObj[`${v.parkname}-${s.time}`]" />
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="code-box-as" id="codeBoxAs" ref="codeBoxAs"></div>
    </div>
</template>

<script>
// JSESSIONID=536BABDC1F54316572934C0DA893483E
// 	openid=oR_qexL17fcNPVkLyzOKOdpucCQc
import {extendsGC, extendsGY, extendsK} from './staticCourt'
import $ from 'jquery'
import slideClass from '@/API/slide'




    export default {
        name: '',
        props: {
            username: String,
            coor: Number,
            userRole: String,
            theme: String
        },
        data() {
            return {
				captchaVerification: null,
				slide_: null,
				slideOpt: {
					baseUrl: 'http://tennis.coopcloud.cn',  //服务器请求地址, 不填写就是localhost
					mode: 'pop',     //展示模式
					containerId: 'checkCodeBtn',//pop模式 必填 被点击之后出现行为验证码的元素id
					imgSize: {       //图片的大小对象,有默认值{ width: '310px',height: '155px'},可省略
						width: '80%',
						height: '180px',
					},
					barSize: {          //下方滑块的大小对象,有默认值{ width: '310px',height: '50px'},可省略
						width: '80%',
						height: '30px',
					},
					beforeCheck: function () {  //检验参数合法性的函数  mode ="pop"有效
						//实现: 参数合法性的判断逻辑, 返回一个boolean值
						return true
					},
					ready: function () {
					},  //加载完毕的回调
					success: function (params) { //成功的回调
						// params为返回的二次验证参数 需要在接下来的实现逻辑回传服务器
						// setTimeout(function () {
						// 	$("#captchaVerification").val(params.captchaVerification)
						// 	checksuccess();
						// }, 300);
						console.log(params)
					},
					error: function () {
					}        //失败的回调
				},
				extendsGC: extendsGC,
				extendsGY: extendsGY,
				extendsK: extendsK,
				orderStart: false,
				minTime: 12,
				maxTime: 21,
				timeNow: {
					h: null,
					m: null,
					s: null,
				},
				orderStatus: false,
				startTime: {
					h: null,
					m: null,
					s: null,
				},
				weekData: [
					"周日", "周一", "周二", "周三", "周四", "周五", "周六"
				],
				selectDateVal: 0,
				courtAreaVal: null,
				courtAreaList: [],
				userid: null,
				parkstatus: null,
				ballcode: null,
				courtInfo: {},
				selectCourtData: [],
				maxOrderNum: 2,
				paywaycode: 0,
            };
        },						
        methods: {
			async pageinit(){
				await this._user.judgeWXuser()
				this.courtInit()
				await this.cardInit()
				await this.userInit()
				await this.courtListInit()
				this.slideInit()
			},
			changeSelect(val){
				this.selectDateVal = val
				this.courtListInit()
			},
			async cardInit(){
				await this._user.userCardGet()
				this.cardtypecode = await this._user.userCardTypeCodeGet()
			},
			async userInit(){
				this.userid = this._user.getUserId()
			},
			async courtInit(){
				this.courtAreaList = this._court.getCourtAreaList()
				this.ballcode = this._court.getBallcode()
				this.parkstatus = this._court.getParkstatus()
			},
			async courtListInit(){
				this.selectCourtData = []
				let res = await this._court.getCourtList(this.courtListParams)
				if(res){
					this.courtInfo = res
				}

				console.log(res)
				this.$nextTick(() => {
					this.createOrderListControl()
				})
			},
			selectCourt(court, courtPar){
				if(!court || court.bookstatus != 0) return
				let list = this.selectCourtData
				let f = null
				for(var i in list){
					if(list[i].court.time == court.time && list[i].courtPar.id == courtPar.id){
						f = i
						break
					}
				}
				if(f === null){
					if(this.selectCourtData.length >= this.maxOrderNum){
						this._errorHandle.handleRes({respMsg: '最多只能选择两片'})
						return
					}
					this.selectCourtData.push({
						court: court,
						courtPar: courtPar
					})
					return
				}
				this.selectCourtData.splice(f, 1)
			},
			async orderCourt(){
				if(this.orderDisabled) return
				let params = this.orderParams
				params = await this.orderParamsPar(params)
				if(!params) return
				let res = await this._court.orderCourt(params)
				console.log(res)
			},
			
			// getOrderCourtParams(court, courtPar){

			// },
			
			timeoutPromise(time){
				let promise = new Promise(success => {
					setTimeout(() => {
						success()
					}, time);
				})
				return promise
			},
			setTimeToOrder(startH, startM, startS){
				startH = startH === undefined ? 0 : startH
				startM = startM === undefined ? 0 : startM
				startS = startS === undefined ? 1 : startS
				console.log(startH, startM, startS)
				this.startTime = {
					h: startH,
					m: startM,
					s: startS,
				}
				let t = 0, ts = 200
				let promise = new Promise(success => {
					this.orderStatus = true
					let interval = setInterval(() => {
						let time = new Date()
						let hour = time.getHours()
						let min = time.getMinutes()
						let second = time.getSeconds()
						if(hour == startH && min == startM && second == startS){
							this.orderStatus = false
							this.startTime = {
								h: null,
								m: null,
								s: null
							}
							clearInterval(interval)
							success()
						}
						t = t + ts
						if(t % 1000 == 0){
							console.log('waiting time')
							console.log(`${hour}:${min}:${second}`)
						}
						
					}, ts)
				})
				return promise
			},
			async orderCourtAs(){
				let requestList = this.createOrderListControl() || []
				if(!requestList.length){
					this._errorHandle.handleRes({respMsg: '没有可用的场地'})
					return
				}
				this.orderCourtACH(requestList)
			},
			async orderCourtImmdia(){
				let requestList = this.createOrderListControl() || []


				// let requestList = this.createOrderListNew(null, null, this.courtContent)
				console.log(requestList)
				if(!requestList.length){
					this._errorHandle.handleRes({respMsg: '没有可用的场地'})
					return
				}
				this.orderStart = true
				// this.orderCourtIntervalAction_random(requestList)
				this.orderCourtIntervalAction(requestList)
			},
			async tryQueryCort(num){
				num = num || 1
				if(num >= 8) return false
				await this.courtListInit()
				let list = this.courtContent || []
				let data = list[0]
				if(data){
					let tem = data.reserve || []
					if(tem[0] && tem[0].bookstatus != 3) return true
				}
				num++
				console.log('wait ing ing')
				await this.timeoutPromise(300)
				return this.tryQueryCort(num)
			},
			async orderCourtInterval(){
				await this.setTimeToOrder(0, 0, 0)
				console.log('start order')
				await this.timeoutPromise(500)
				await this.tryQueryCort()
				let requestList = this.availableCourt || []
				if(!requestList.length){
					console.log('没有可用的场地，执行默认规则')
					this._errorHandle.handleRes({respMsg: '没有可用的场地，执行默认规则'})
					return this.orderCourtImmdia()
				}
				this.orderStart = true
				console.log(this._dataType.deepCopy(requestList))
				// this.orderCourtIntervalAction(requestList)
				this.orderCourtIntervalAction_random(requestList)
				
			},
			async orderCourtIntervalAction_random(list){
				if(!this.orderStart) return
				list = list || []
				let index = this.randomNum(0, list.length - 1)
				let timeBefore = parseInt((new Date()).getTime())
				let split = 1000
				let data = list[index]
				console.log(JSON.parse(JSON.stringify(list)))
				if(!data || !list.length){
					console.log('结束')
					this._errorHandle.handleRes({respMsg: '未预定到场地'})
					this.orderStart = false
					return
				}
				console.log(data)
				data = await this.orderParamsPar(data)
				let res = null
				if(data){
					res = await this._court.orderCourt(data)
					console.log(res)
					// 1072 -- 已预定2小时
					if(res && res.respCode == 1072){
						console.log('已锁定或预定2小时')
						this._errorHandle.handleRes({respMsg: '已锁定或预定2小时'})
						this.orderStart = false
						return
					}
				}
				let timeAfter = parseInt((new Date()).getTime())
				let t = split - (timeAfter - timeBefore)
				await this.timeoutPromise(t)
				if(this._dataType.isObject(res) && res.respCode != 1071){
					list.splice(index, 1)
				}
				this.orderCourtIntervalAction_random(list)
			},
			async orderCourtIntervalAction(list){
				if(!this.orderStart) return
				list = list || []
				let index = 0
				let split = 1000
				let data = list[index]
				let timeBefore = parseInt((new Date()).getTime())
				console.log(JSON.parse(JSON.stringify(list)))
				if(!data || !list.length){
					console.log('结束')
					this._errorHandle.handleRes({respMsg: '未预定到场地'})
					this.orderStart = false
					return
				}
				console.log(data)

				data = await this.orderParamsPar(data)
				let res = null
				if(data){
					res = await this._court.orderCourt(data)
					console.log(res)
					// 1072 -- 已预定2小时
					if(res && res.respCode == 1072){
						console.log('已锁定或预定2小时')
						this._errorHandle.handleRes({respMsg: '已锁定或预定2小时'})
						this.orderStart = false
						return
					}
				}


				// let res = await this._court.orderCourt(data)
				// console.log(res)
				// // 1072 -- 已预定2小时
				// if(res && res.respCode == 1072){
				// 	console.log('已锁定或预定2小时')
				// 	this._errorHandle.handleRes({respMsg: '已锁定或预定2小时'})
				// 	this.orderStart = false
				// 	return
				// }
				let timeAfter = parseInt((new Date()).getTime())
				let t = split - (timeAfter - timeBefore)
				await this.timeoutPromise(t)
				if(this._dataType.isObject(res) && res.respCode != 1071){
					list.splice(index, 1)
				}
				this.orderCourtIntervalAction(list)
			},

			orderCourtACH(list){
				list = list || []
				for(var i in list){
					let data = list[i]
					this._court.orderCourt(data)
				}
			},

			createOrderList(){
				let minTime = 19, maxTime = 20
				let disabledCourtId = 38
				let list = this.courtContent || []
				let date = this.selectDateData
				if(!list.length) return
				let rd = []
				for(var i in list){
					if(list[i].id == disabledCourtId) continue
					let reserve = list[i].reserve
					for(var j = 0; j < reserve.length; j = j + 2){
						let t1 = reserve[j], t2 = reserve[j + 1]
						if(!t1 || t1.time < minTime || t1.time > maxTime) continue
						if(!t2 || t2.time < minTime || t2.time > maxTime) continue
						rd.push({
							addOrderType: 'wx',
							userid: this.userid,
							paywaycode: this.paywaycode,
							cardnumber: '',
							mobile: '',
							ordercode: '',
							parkList: JSON.stringify([
								{
									time: t1.time,
									parkname: list[i].parkname,
									date: `${date.year}-${date.month}-${date.day}`,
									parkid: list[i].id
								},
								{
									time: t2.time,
									parkname: list[i].parkname,
									date: `${date.year}-${date.month}-${date.day}`,
									parkid: list[i].id
								},
							])
						})
					}
				}
				return rd
			},
			sortData(data, handleFun) {
				let qsort = fn => ([x, ...xn]) => x == null ? []
					: [
						...qsort(fn)(xn.filter(a => fn(a, x))),
						x,
						...qsort(fn)(xn.filter(a => !fn(a, x)))
					]
				return qsort((a, b) => {
					return handleFun(a, b)
				})(data)
			},
			definePark(){
				let list = this.courtInfo || {}
				list = list.venList || []
				if(!list.length) return


				let se = []
				let tem = this._dataType.deepCopy(list)
				console.log(this._dataType.deepCopy(tem))
				let kvid = 13
				let kpark = [], kdata = null
				for(var i in tem){
					if(tem[i].vid == kvid){
						kpark = tem[i].park
						kdata = tem[i]
						break
					}
				}
				if(!kpark.length) return []
				se.push(kpark.pop())
				se.push(kpark.pop())
				se.push(kpark.pop())
				se.push(kpark.pop())
				let rd = {}
				for(i in kdata){
					if(i == 'park') continue
					rd[i] = kdata[i]
				}
				rd.park = se
				console.log(this._dataType.deepCopy(rd))
				console.log(JSON.stringify(rd))
				
			},
			createOrderListControl(minTime, maxTime,){
				let list = this._dataType.deepCopy(this.courtInfo) || {}
				list = list.venList || []
				// console.log(this._dataType.deepCopy(list[0]))
				// console.log(JSON.stringify(list[0]))
				if(list[0].vname.indexOf('G') > -1){
					console.log('enter')
					list.shift()
				}
				
				if(!list.length) return
				let data = [], disabledVid = null
				// this.definePark()
				// list = this.extendG.concat(list)
				// list = this.kextend.concat(list)
				console.log(this._dataType.deepCopy(list))
				let K = this._dataType.deepCopy(extendsK)
				K = K.reverse()
				let GY = this._dataType.deepCopy(extendsGY)
				let GC = this._dataType.deepCopy(extendsGC)
				list = K.concat(list)
				list = GC.concat(list)
				list = GY.concat(list)


				// list = list.reverse()
				for(var i in list){
					if(list[i].vid == 13 && list[i].park.length > 5){
						list[i].park.pop()
						list[i].park.pop()
						list[i].park.pop()
						list[i].park.pop()
					}
				}
				console.log(this._dataType.deepCopy(list))
				for(i in list){
					if(disabledVid !== null && list[i].vid == disabledVid) continue
					let tem = this.createOrderListNew(minTime, maxTime, list[i].park)
					tem = tem.concat(JSON.parse(JSON.stringify(data)))
					data = tem
					// data = data.concat(this.createOrderListNew(minTime, maxTime, list[i].park))
				}
				data.reverse()
				console.log(this._dataType.deepCopy(data))
				return data
			},
			createOrderListNew(minTime, maxTime, list){
				minTime = minTime || this.minTime, maxTime = maxTime || this.maxTime
				let orderNum = 2
				if(maxTime == minTime) orderNum = 1
				let disabledCourtId = 38
				list = list || this.courtContent || []
				let date = this.selectDateData
				if(!list.length) return
				let rd = []
				let timeList = list[0].reserve
				let rd_as = []
				for(var j = 0; j < timeList.length; j++){
					let as_list = []
					for(var i in list){
						if(list[i].id == disabledCourtId) continue
						let parkList = []
						let tem = list[i].reserve[j]
						if(!tem || tem.time < minTime || tem.time > maxTime){
							continue
						}
						parkList.push({
							time: tem.time,
							parkname: list[i].parkname,
							date: `${date.year}-${date.month}-${date.day}`,
							parkid: list[i].id
						})
						if(orderNum > parkList.length){
							tem = list[i].reserve[j + 1]
							if(!tem || tem.time < minTime || tem.time > maxTime){
								continue
							}
							parkList.push({
								time: tem.time,
								parkname: list[i].parkname,
								date: `${date.year}-${date.month}-${date.day}`,
								parkid: list[i].id
							})
						}
						rd.push({
							addOrderType: 'wx',
							userid: this.userid,
							paywaycode: this.paywaycode,
							cardnumber: '',
							parkList: JSON.stringify(parkList),
							mobile: '',
							ordercode: ''
							// parkList: parkList
						})
						as_list.push({
							addOrderType: 'wx',
							userid: this.userid,
							paywaycode: this.paywaycode,
							cardnumber: '',
							parkList: JSON.stringify(parkList),
							mobile: '',
							ordercode: ''
							// parkList: parkList
						})
					}
					if(as_list.length) rd_as.push(this._dataType.deepCopy(as_list))
				}
				let lastData = []
				for(i in rd_as){
					rd_as[i] = this.randomArray(rd_as[i])
					lastData = lastData.concat(rd_as[i])
				}
				// return rd
				return lastData
			},
			randomArray(arr){
				arr.sort(() =>{
	            	return Math.random() - 0.5
         		})
				return arr
			},
			courtAreaChange(){
				this.courtListInit()
			},
			randomNum(minNum, maxNum) {
				return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
			},
			orderStop(){
				this.orderStart = false
			},
			slideInit(){
				let ele = $('#codeBoxAs')
				console.log(ele)
				let options = this._dataType.deepCopy(this.slideOpt)
				options.getPictrueCallback = this.getPictrue
				options.checkPictrueCallback = this.checkPictrue
				this.slide_ = new slideClass(ele, options)
				this.slide_.init()
			},
			async getPictrue(){
				// let res = await this._court.getCheckCode(this.userid)
				// if(res && res.repCode == '0000'){
				// 	return res.repData
				// }
				let res = await this.getPictrueAction()
				if(res && res.repCode == '0000'){
					return res.repData
				}
			},
			async getPictrueAction(num){
				console.log(num)
				let timeBefore = parseInt((new Date()).getTime() / 1000)
				let split = 1000
				let max = 3
				num = num || 1
				if(num > max) return false
				let res = await this._court.getCheckCode(this.userid)
				let timeAfter = parseInt((new Date()).getTime() / 1000)
				if(res && res.repCode == '0000'){
					return res
				}else{
					let det = split - (timeAfter - timeBefore) 
					console.log(det)
					if(det < 0) det = 0
					setTimeout(() => {
						return this.getPictrueAction(++num)
					}, det);
				}
			},
			async checkPictrue(data, captchaVerification){
				console.log(data)
				let res = await this._court.checkImgCode(data)
				return res
			},
			async imgCodeOpen(){
				await this.slide_.refresh()
				this.slide_.$element.find(".mask").css("display", "block");
			},
			imgCodeClose(){
				this.slide_.$element.find(".mask").css("display", "none");
				// this.slide_.refresh()
			},
			async imgcodeStart(){
				let res = await this.slide_.imgCodeStart()
				console.log(res)
				res = res || {}
				// this.imgCodeClose()
				return res
			},
			async orderParamsPar(params){
				let checkData = await this.imgcodeStart()
				checkData = checkData || {}
				if(checkData.captchaVerification) params.captchaVerification = checkData.captchaVerification
				if(!params.captchaVerification) return null
				// let res = await this._court.checkImgCode(checkData.data)
				// if(!res || res.repCode != '0000') return null
				return params
			},
        },
        created() {
			this.extendsGC = extendsGC
			this.extendsGY = extendsGY
			this.extendsK = extendsK

			// setInterval(() => {
			// 	let t = new Date()
			// 	this.timeNow = {
			// 		h: t.getHours(),
			// 		m: t.getMinutes(),
			// 		s: t.getSeconds(),
			// 	}
			// }, 500);
        },
        components: {
        },
        computed: {
			availableCourt(){
				let list = this.courtContent || []
				let {minTime, maxTime} = this
				let date = this.selectDateData
				let orderList = []
				for(var i in list){
					let reserve = list[i].reserve
					let j = 0
					while(reserve[j]){
						let d1 = reserve[j], d2 = reserve[Number(j) + 1]
						j++
						if(!d2)continue
						let t1 = d1.time
						let t2 = d2.time
						if(t1 >= minTime && t1 <= maxTime && 
						t2 >= minTime && t2 <= maxTime &&
						d1.bookstatus == 0 && d2.bookstatus == 0){
							let temList = []
							temList.push({
								time: d1.time,
								parkname: list[i].parkname,
								date: `${date.year}-${date.month}-${date.day}`,
								parkid: list[i].id
							})
							temList.push({
								time: d2.time,
								parkname: list[i].parkname,
								date: `${date.year}-${date.month}-${date.day}`,
								parkid: list[i].id
							})
							orderList.push({
								addOrderType: 'wx',
								userid: this.userid,
								paywaycode: this.paywaycode,
								cardnumber: '',
								parkList: JSON.stringify(temList),
								mobile: '',
								ordercode: ''
							})
							
						}
					}
				}
				return orderList
			},
			// remainTime(){
			// 	let timeNow = this.timeNow
			// 	let start = this.startTime
			// 	if()
			// 	let remain = {
			// 		h: 
			// 	}
			// },
			orderDisabled(){
				return this.selectCourtData.length <= 0
			},
			selectParams(){
				let list = this.selectCourtData
				let rd = []
				let date = this.selectDateData
				for(var i in list){
					let court = list[i].court
					let courtPar = list[i].courtPar
					rd.push({
						time: court.time,
						parkname: courtPar.parkname,
						date: `${date.year}-${date.month}-${date.day}`,
						parkid: courtPar.id
					})
				}
				return rd
			},
			orderParams(){
				let data = {
					addOrderType: 'wx',
					userid: this.userid,
					parkList: JSON.stringify(this.selectParams),
					paywaycode: this.paywaycode,
					cardnumber: '',
					mobile: '',
					ordercode: ''
				}
				return data
			},
			selectCourtDataObj(){
				let list = this.selectCourtData
				let rd = {}
				for(var i in list){
					let key = `${list[i].courtPar.parkname}-${list[i].court.time}`
					rd[key] = list[i]
				}
				return rd
			},
			currentPark(){
				let info = this.courtInfo || {}
				info = info.venList || []
				let seleInfo = this.courtAreaSelectData || {}
				let rd = null
				for(var i in info){
					if(seleInfo.vid == info[i].vid){
						rd = info[i]
						break
					}
				}
				return rd || {}
			},
			courtContent(){
				let info = this.currentPark || {}
				let park = info.park || []
				return park
			},
			courtTimeList(){
				let info = this.currentPark || {}
				if(!info.park) return []
				let park = info.park
				park = park[0] || {}
				park = park.reserve || []
				let rd = []
				for(var i in park){
					rd.push(park[i].time)
				}
				return rd

			},
			parktypeinfo(){
				let data = this.courtAreaSelectData
				return data.parktypeinfo
			},
			courtListParams(){
				let date = this.selectDateData
				let userid = this.userid
				return {
					date: `${date.year}-${date.month}-${date.day}`,
					userid: userid,
					cardtypecode: this.cardtypecode,
					parktypeinfo: this.parktypeinfo,
					ballcode: this.ballcode,
					parkstatus: this.parkstatus

				}
			},
			courtAreaSelectData(){
				let list = this.courtAreaList
				let val = this.courtAreaVal
				return list[val] || {}
			},
			selectDateData(){
				let select = this.selectDateVal
				let dateNav = this.dateNav
				if(!dateNav[select]) return {}
				return dateNav[select]
			},
			dateNav(){
				let date = new Date()
				let list = [], weekData = this.weekData
				let i = date.getDay()
				let dayTime = 24 * 60 * 60 * 1000
				while(list.length <= weekData.length){
					if(!weekData[i]){
						break
					}
					let d = date.getTime()
					let tem = list.length * dayTime
					d = d + tem
					d = new Date(d)
					d = {
						month: (d.getMonth() + 1),
						day: d.getDate(),
						year: d.getFullYear()
					}
					for(var j in d){
						if(d[j] < 10) d[j] = `0${d[j]}`
					}
					let yn = `${d.month}月${d.day}日`
					list.push({
						weekday: weekData[i],
						date: yn,
						month: d.month,
						day: d.day,
						year: d.year

					})
					
					i++
					i = i % weekData.length
				}
				return list
			},
		},
        watch: {},
        mounted() {
			this.pageinit()
		},
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style src="./verify.css"></style>
<style lang='less' >
	.page-index{
		@timeWidth: 30px;
		@courtWidth: 35px;
		@courtHeight: 25px;
		.date-box, .court-area-box{
			.van-grid-item__content{
				padding: 5px 0px;
			}
			.txt{
				font-size: 12px;
				white-space: nowrap;
			}
		}
		// .court-area-box{
		// 	// margin-top: 5px;
		// 	.van-tabs__wrap--scrollable{
		// 		.van-tab{
		// 			// flex: 0 0 15%;
		// 			// flex-basis: 15% !important;
		// 		}
		// 	}
		// }
		.court-box{
			display: flex;
			.court-item.a{
				.item{
					width: @timeWidth;
					height: @courtHeight;
					display: flex;
					align-items: center;
					justify-content: center;
					.txt{
						font-size: 12px;
					}
				}
			}
			.court-item.b{
				display: flex;
				.b-content{
					width: @courtWidth;
					.head, .con-list-item{
						height: @courtHeight;
						width: 100%;
					}
					.con-list-item{
						background: #2BB061;
						.item-body{
							width: 100%;
							height: 100%;
							border-right: 1px solid #fff;
							border-top: 1px solid #fff;
							display: flex;
							align-items: center;
							justify-content: center;
							.order-icon{
								color: #fff;
								font-size: 14px;
							}
						}
					}
					.con-list-item.status.avai{
						background: #2BB061;
					}
					.con-list-item.status.unavai{
						background: #B7BDBF;
					}
					.con-list-item.order{
						background: #F9C325;
					}
					.con-list-item.status.selected{
						background: #FF832D;
					}
				}
			}
		}
		.area-box{
			padding-top: 0px;
			.order-btn{
				height: 20px;
				margin-top: 10px;
			}
			.order-btn:first-child{
				margin: 0px;
			}
			.order-spec{
				position: fixed;
				top: 30vh;
				left: 0px;
				z-index: 999;
				width: 30vw;
			}
		}
	}
</style>