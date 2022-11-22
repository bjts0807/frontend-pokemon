import { createStore } from "vuex";
import { login,logout, csrfCookie,getAuthenticatedUser } from "../services/loginService";
import router from "../router/index"

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    sidebarType: "bg-gradient-dark",
    isRTL: false,
    color: "info",
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    isDarkMode: false,
    navbarFixed:
      "position-sticky blur shadow-blur left-auto top-1 z-index-sticky px-0 mx-4",
    absolute: "position-absolute px-4 mx-0 w-100 z-index-2",
    is_logged : false,
    user: null,
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");

      if (sidenav_show.classList.contains("g-sidenav-pinned")) {
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = false;
      }
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
    toggleEveryDisplay(state) {
      state.showNavbar = !state.showNavbar;
      state.showSidenav = !state.showSidenav;
      state.showFooter = !state.showFooter;
    },
    toggleHideConfig(state) {
      state.hideConfigButton = !state.hideConfigButton;
    },
    color(state, payload) {
      state.color = payload;
    },
    isLogged(state, isLogged) {
      state.is_logged = isLogged;
    },
    SET_LOGIN_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    setColor({ commit }, payload) {
      commit("color", payload);
    },
    async login({commit }, credentials) {
      await csrfCookie();
      await  login(credentials).then(response => {
          if (response.data) {
            commit("isLogged", true);
              commit('SET_LOGIN_USER', response.data);
              router.push({
                name : 'Dashboard'
              })
          }
         
      });
    },
    async logout({ commit }) {
      await logout();
      commit('SET_LOGIN_USER', null);
      commit('isLogged', false);
      router.push({
        name : 'signin'
      })
    },
    async currentUser({ commit }) {
      try {
        let response = await getAuthenticatedUser();
        if (response.data) {
            commit('SET_LOGIN_USER', response.data);
            commit('isLogged', true);
            router.push({
              name : 'Dashboard'
            })
        } else {
          commit('isLogged', false);
        }
      } catch (e) {
          switch (e.response.status) {
              case 401:
                  commit('SET_LOGIN_USER', {});
                  commit('isLogged', false);
                  break;
          }
      }
    },
  },
  getters: {},
});
