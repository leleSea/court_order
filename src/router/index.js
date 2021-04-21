import Vue from "vue";
import VueRouter from "vue-router";
import index from '../views/index/index.vue'

// const originalReplace = VueRouter.prototype.replace;
// VueRouter.prototype.replace = function replace(location) {
//     return originalReplace.call(this, location).catch(err => err);
// };

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter);
const routes = [
	{
		path: "/",
		name: "index",
		component: index
	},
	{
		path: "/index",
		name: "index",
		component: index
	},
	{
		path: "/login",
		name: "login",
		component: () => import("../views/login/login.vue")
	},
	{
		path: "/about",
		name: "About",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
		import(/* webpackChunkName: "about" */ "../views/About.vue")
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
