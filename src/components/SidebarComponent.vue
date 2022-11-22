<template>
    <div>
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'Dashboard'}">
              <i class="icon-grid menu-icon"></i>
              <span class="menu-title">Dashboard</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'users.profile'}">
              <i class="ti-settings menu-icon"></i>
              <span class="menu-title">Perfil</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'favourites.list'}">
              <i class="ti-heart menu-icon"></i>
              <span class="menu-title">Favoritos</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
</template>

<script>
import { mapState } from "vuex";
  export default{
    computed: {
    ...mapState(["isRTL", "sidebarType", "isDarkMode"]),
  },
  }
</script>