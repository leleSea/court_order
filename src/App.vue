<template>
	<div id="app" class="pro-app">
		<router-view />
	</div>
</template>
<script>

    export default {
        name: '',
        props: {
        },
        data() {
            return {
            };
        },
        methods: {
            async appInit(){
                let res = await this._user.statusCheck()
                if(!res){
                    this._routGoto.gotoPage('login')
                    return
                }
                this._routGoto.gotoPage('index')
            }
        },
        created() {

        },
        components: {
        },
        computed: {},
        watch: {},
        mounted() {
            this.appInit()
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
<style lang="less">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
		color: #42b983;
		}
	}
}
body{
    background: #ddd;
}
</style>
