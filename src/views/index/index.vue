<!--  -->
<template>
    <div class='page-index'>
		<div class="area-box">
			<van-button class="order-btn" type="primary" @click="orderCourt" block :disabled="orderDisabled">预定</van-button>
			<van-button class="order-btn" type="primary" @click="orderCourtInterval" block >定时预定</van-button>
			<van-button class="order-btn" type="primary" @click="orderCourtImmdia" block >立即预定</van-button>
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
    </div>
</template>

<script>

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
				minTime: 19,
				maxTime: 20,
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
				maxOrderNum: 2
            };
        },						
        methods: {
			async pageinit(){
				await this._user.judgeWXuser()
				this.courtInit()
				await this.cardInit()
				await this.userInit()
				await this.courtListInit()
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
					console.log(this.currentPark)
					console.log(this.courtTimeList)
					this.createOrderListNew()
				})
			},
			selectCourt(court, courtPar){
				console.log(court)
				console.log(courtPar)
				if(!court || court.bookstatus != 0) return
				let list = this.selectCourtData
				let f = null
				for(var i in list){
					if(list[i].court.time == court.time && list[i].courtPar.id == courtPar.id){
						f = i
						break
					}
				}
				console.log(f)
				if(f === null){
					if(this.selectCourtData.length >= this.maxOrderNum){
						this._errorHandle.handleRes({respMsg: '最多只能选择两片'})
						return
					}
					this.selectCourtData.push({
						court: court,
						courtPar: courtPar
					})
					console.log(this.selectCourtData)
					console.log(this.selectCourtDataObj)
					return
				}
				this.selectCourtData.splice(f, 1)
			},
			async orderCourt(){
				console.log('orderCourt')
				if(this.orderDisabled) return
				let params = this.orderParams
				console.log(params)
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
			async orderCourtImmdia(){
				let requestList = this.createOrderListNew() || []
				if(!requestList.length){
					this._errorHandle.handleRes({respMsg: '没有可用的场地'})
					return
				}
				this.orderCourtIntervalAction(requestList)
			},
			async orderCourtInterval(){
				await this.setTimeToOrder(0, 0, 0)
				console.log('start order')
				let requestList = this.createOrderListNew() || []
				if(!requestList.length){
					this._errorHandle.handleRes({respMsg: '没有可用的场地'})
					return
				}
				this.orderCourtIntervalAction(requestList)
			},
			async orderCourtIntervalAction(list, index){
				list = list || []
				index = index || 0
				let timeBefore = parseInt((new Date()).getTime())
				let split = 300
				let data = list[index]
				if(!data){
					console.log('结束')
					this._errorHandle.handleRes({respMsg: '未预定到场地'})
					return
				}
				console.log(data)
				let res = await this._court.orderCourt(data)
				console.log(res)
				// 1072 -- 已预定2小时
				if(res && res.respCode == 1072){
					console.log('已锁定或预定2小时')
					this._errorHandle.handleRes({respMsg: '已锁定或预定2小时'})
					return
				}
				let timeAfter = parseInt((new Date()).getTime())
				let t = split - (timeAfter - timeBefore)
				console.log(t)
				await this.timeoutPromise(t)
				index++
				this.orderCourtIntervalAction(list, index)
			},
			createOrderList(){
				let minTime = 19, maxTime = 20
				let disabledCourtId = 38
				let list = this.courtContent || []
				let date = this.selectDateData
				if(!list.length) return
				console.log(list)
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
							paywaycode: 0,
							cardnumber: '',
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
				console.log(rd)
				return rd
			},
			createOrderListNew(minTime, maxTime){
				minTime = minTime || this.minTime, maxTime = maxTime || this.maxTime
				let orderNum = 2
				if(maxTime == minTime) orderNum = 1
				let disabledCourtId = 38
				let list = this.courtContent || []
				let date = this.selectDateData
				if(!list.length) return
				console.log(list)
				let rd = []
				let timeList = list[0].reserve
				for(var j = 0; j < timeList.length; j = j + orderNum){
					for(var i in list){
						if(list[i].id == disabledCourtId) continue
						let parkList = []
						let tem = list[i].reserve[j]
						if(!tem || tem.time < minTime || tem.time > maxTime) continue
						parkList.push({
							time: tem.time,
							parkname: list[i].parkname,
							date: `${date.year}-${date.month}-${date.day}`,
							parkid: list[i].id
						})
						if(orderNum > parkList.length){
							tem = list[i].reserve[j + 1]
							if(!tem || tem.time < minTime || tem.time > maxTime) continue
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
							paywaycode: 0,
							cardnumber: '',
							parkList: JSON.stringify(parkList)
							// parkList: parkList
						})
					}
				}
				console.log(rd)
				return rd
			},
			courtAreaChange(val){
				console.log(val)
				console.log('courtAreaChange')
				this.courtListInit()
			}
        },
        created() {
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
				// addOrderType: "app"
				// parklist: [{time: 14, parkname: "K3", date: "2021-04-22"}, {time: 15, parkname: "K3", date: "2021-04-22"}]
				// [{"date":"2021-04-22","time":"13","parkid":"15","parkname":"D1"}]
				// paywaycode: 0
				// userid: 12765
				// [{"date":"2021-04-22","time":"14","parkid":"7","parkname":"C1"}]
				let data = {
					addOrderType: 'wx',
					userid: this.userid,
					parkList: JSON.stringify(this.selectParams),
					paywaycode: 0,
					cardnumber: ''
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
				console.log(rd)
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
				console.log(rd)
				return rd

			},
			parktypeinfo(){
				let data = this.courtAreaSelectData
				console.log(data)
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
				console.log(list)
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
		.court-area-box{
			// margin-top: 5px;
			.van-tabs__wrap--scrollable{
				.van-tab{
					// flex: 0 0 15%;
					// flex-basis: 15% !important;
				}
			}
		}
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
			.order-btn{
				height: 20px;
			}
		}
	}
</style>