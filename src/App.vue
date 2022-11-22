<template>
  <main>
    <div class="container-scroller">
      <NavbarComponent v-if="showNavbar"/>
      <div class="container-fluid page-body-wrapper">
        <SidebarComponent v-if="showSidenav"/>
        <div class="main-panel">
          <router-view />
          <FooterComponent v-show="showFooter"/>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import SidebarComponent from './components/SidebarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import { mapState } from "vuex";

export default {
  name: 'App',
  components: {
    NavbarComponent,SidebarComponent,FooterComponent
  },
  async created() {
    await this.$store.dispatch("currentUser");
  },
 
  computed: {
    ...mapState([
      "showSidenav",
      "showNavbar",
      "showFooter"
    ]),
    ...mapState(['is_logged', 'user']),
  },
}
</script>