<!--  -->
<template>
    <div class="com-mobile-box" >
        <div class="box-normal">
            <input type="text" class="code-outside" v-model="code" @keyup.enter="actionEnter">
			<van-button class="order-btn" type="primary" @click="getCode" >获取验证码</van-button>
        </div>
        <div class="approveMask"  @click.self="close" v-if="active">
            <div class="approvebg">
                <div class="titletext">验证码</div>
                <div class="approveDataBg">
                    <div class="approveDataTitle">手机号：</div>
                    <input class="approveDataInput" type="text" v-model="mobile" disabled="disabled">
                </div>
                <div class="approveDataBg">
                    <input class="approveDataInput" type="text" id="ordercode" placeholder="请输入短信验证码" v-model="code">
                    <a class="maskgetCodeBtn" ><span id="time" @click="getCode">获取验证码</span></a>
                </div>
                <div class="suer_btn" @click="confirm">确定</div>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: '',
        props: {
            userid: [String, Number]
        },
        data() {
            return {
                active: false,
                code: null,
                // mobile: '18600500769',
                mobile: '15010193341',
                response: null
            };
        },
        methods: {
            open(){
                return new Promise(success => {
                    this.response = success
                    this.active = true
                    if(this.code) this.confirm()
                    else this.getCode()
                })
            },
            confirm(){
                let data = {code: this.code, mobile: this.mobile}
                if(this.response) this.response(data)
                this.close()
            },
            close(){
                this.code = null
                this.active = false
            },
            async getCode(){
                console.log('getCode')
                let res = await this._court.getCode(this.mobile, this.userid)
                res = res || {}
            },
            actionEnter(e){
                this.$emit('acionEnter')
            }
        },
        created() {

        },
        components: {
        },
        computed: {},
        watch: {},
        mounted() {},
        beforeCreate() {}, //生命周期 - 创建之前
        beforeMount() {}, //生命周期 - 挂载之前
        beforeUpdate() {}, //生命周期 - 更新之前
        updated() {}, //生命周期 - 更新之后
        beforeDestroy() {}, //生命周期 - 销毁之前
        destroyed() {}, //生命周期 - 销毁完成
        activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style src="./register.css"></style>
<style lang='less' >

</style>