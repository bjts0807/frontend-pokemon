<template>
    <div class="container-scroller">
    
        <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <span>Prueba Tecnica</span>
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
          <span class="icon-menu"></span>
        </button>
        
        <ul class="navbar-nav navbar-nav-right">
          
          <li class="nav-item nav-profile dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
              <span class="font-weight-bold" v-if="this.$store.state.user">{{this.$store.state.user.name}}</span> <img src="../../public/asset/images/faces/face1.png" alt="profile"/>
            </a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
              <router-link class="dropdown-item" :to="{name:'users.profile'}">
                <i class="ti-settings text-primary"></i>
                Perfil
              </router-link>
              <a class="dropdown-item" @click="logout()">
                <i class="ti-power-off text-primary"></i>
                Cerrar Sesión
              </a>
            </div>
          </li>
         
        </ul>
        <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span class="icon-menu"></span>
        </button>
      </div>
    </nav>
    </div>
</template>
<script>

import {  mapState } from "vuex";
import {useStore} from 'vuex';
import Swal from "sweetalert2";

export default {
  name: "navbarComponent",
  setup (){
    const store = useStore();
    const logout = async () => {
      try{
        const result = await Swal.fire({
          title :  "¿Está seguro de finalizar la Sesión ?",
          text : "",
          showCancelButton : true,
          showConfirmButton : true,
          confirmButtonColor: "#1a73e8",
          confirmButtonText : 'Sí, finalizar',
          cancelButtonText : 'No',
          icon : "warning",
          showLoaderOnConfirm : true,
          preConfirm: async () => {
            try{
             await store.dispatch('logout')
            }catch (e) {
              console.error(e);
              Swal.showValidationMessage('ha ocurrido un error al procesar la solicitud');
            }

          },
        });

        if(result.isConfirmed){
          Swal.fire('Exíto', 'Sesión finalizada con exíto', 'success');
          
        }
        
        
      }catch (e) {
        console.error(e);
      }
    }
  

    return {
      logout
    }
  },

  computed: {
    ...mapState(["is_logged", 'user']),

    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>