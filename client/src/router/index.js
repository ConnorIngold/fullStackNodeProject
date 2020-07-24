import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import RegisterComp from "../views/Register.vue";
import LoginComp from "../views/Login.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/register",
    name: "RegisterComp",
    component: RegisterComp,
  },
  {
    path: "/login",
    name: "LoginComp",
    component: LoginComp,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
