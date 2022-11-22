import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";

const routes = [

  {
    path: "/",
    name: "/",
    redirect: "/signin",
    component: () => import("../views/SignInComponent")
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("../views/SignInComponent"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/DashboardComponent"),
    meta : {requiresLogin: true},
  },
  {
    path: "/forms",
    name: "forms.index",
    component: () => import("../views/forms/IndexComponent"),
   meta : {requiresLogin: true},
  },
  {
    path: "/register",
    name: "users.register",
    component: () => import("../views/RegisterComponent"),
  },
  {
    path: "/pokemon/show/:url",
    name: "pokemon.show",
    component: () => import("../views/pokemons/ShowComponent"),
  },
  {
    path: "/users/profile",
    name: "users.profile",
    component: () => import("../views/users/ProfileComponent"),
  },
  {
    path: "/favourites/list",
    name: "favourites.list",
    component: () => import("../views/FavouritesComponent"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  mode: 'history',
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin) && !store.state.is_logged) {
      next("/signin")
  } else {
      next()
  }
}) 
export default router;
