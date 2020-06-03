import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Home from "./containers/home/index.vue";
import Logout from "./containers/logout/index.vue";

// application routes
const routes = [
  { path: "/", component: Home },
  { path: "/logout", component: Logout },
];

// export router instance
export default new Router({
  mode: "history",
  routes,
  linkActiveClass: "is-active",
});
