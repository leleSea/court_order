<!--  -->
<template>
    <div class='page-login'>
        <div class="input-hidden">
            <input type="text" name="username">
            <input type="password" name="password">
        </div>

        <van-cell-group>
            <van-field v-model="phone" type="poneNum" label="手机号" placeholder="手机号" clearable />
        </van-cell-group>
        <van-cell-group>
            <van-field
                v-model="code"
                center
                clearable
                label="短信验证码"
                placeholder="短信验证码"
                >
                <template #button>
                    <van-button size="small" type="primary" @click="sendSmsCode">
                        <div class="count-time" v-if="codeStatus">
                            <van-count-down :time="time" format="ss" @finish="countFinish" />
                        </div>
                        <p class="txt" v-if="!codeStatus">发送验证码</p>
                    </van-button>
                </template>
                </van-field>
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="password" type="password" label="密码" placeholder="密码" clearable />
        </van-cell-group>
        <van-cell-group>
            <van-button type="primary" block @click="login">登录</van-button>
        </van-cell-group>
    </div>
</template>

<script>
    export default {
        name: 'login',
        props: {
            username: String,
            coor: Number,
            userRole: String,
            theme: String
        },
        data() {
            return {
                time: 60 * 1000,
                phone: null,
                code: null,
                password: null,
                codeStatus: false
            };
        },
        methods: {
            async sendSmsCode(){
                if(!this.phone || this.codeStatus) return
                let res = await this._user.sendSmsCode(this.phone)
                if(res && res.respCode == '1001'){
                    this.codeStatus = true
                }
                this.codeStatus = true
            },
            countFinish(){
                this.codeStatus = false
            },
            async login(){
                if(!this.phone || !this.code || !this.password) return
                let res = await this._user.login(this.phone, this.code, this.password)
                console.log(res)
                if(res && res.respCode == '1001'){
                    console.log('login success')
                    this._routGoto.gotoPage('index')
                    this._Notify({ type: 'success', message: '登录成功' })
                }
            },
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
<style lang='less' >
    .page-login{
        padding-top: 10vh;
        .login-input{
            .item{
                margin-bottom: 1rem;
            }
            .item:last-child{
                margin: 0px;
            }
        }
    }
</style>