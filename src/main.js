import Vue from "vue";
import './css/reset.less'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import user from './API/user'
import court from './API/court'
import routGoto from './router/routGoto'
import dataType from './dataType'
import './vant'
import { Notify } from 'vant';
import errorHandle from './errorHandle'



Vue.prototype._user = new user()
Vue.prototype._court = new court()
Vue.prototype._routGoto = new routGoto()
Vue.prototype._dataType = new dataType()
Vue.prototype._Notify = Notify
Vue.prototype._errorHandle = new errorHandle()

Vue.config.productionTip = false;

new Vue(
	{
		router,
		store,
		render: h => h(App)
	}
).$mount("#app");
