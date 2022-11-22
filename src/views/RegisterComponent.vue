<template>
    <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">
              <div class="brand-logo">
                 <h2 class="text-primary">Registro de Usuario</h2>
              </div>
              <form class="pt-3">
                <div class="form-group">
                    <input type="text" class="form-control form-control-lg" id="exampleInputUsername1" placeholder="Nombre" v-model="user.name">
                    <div v-if="v$.user.name.$error" class="text-danger" style="font-size:14px" >
                        <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                    </div>
                </div>
                <div class="form-group">
                  <input type="email" class="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" v-model="user.email">
                  <div v-if="v$.user.email.$error" class="text-danger" style="font-size:14px" >
                    <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                </div>
                </div>
                <div class="form-group">
                  <input type="password" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" v-model="user.password">
                  <div v-if="v$.user.password.$error" class="text-danger" style="font-size:14px" >
                        <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                    </div>
                </div>
                
                <div class="mt-3">
                  <button type="button" class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" @click="save();">REGISTRARME</button>
                </div>
                <div class="text-center mt-4 font-weight-light">
                  ya tienes una cuenta? <router-link :to="{name:'signin'}" class="text-primary">Inicia Sesión</router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import useVuelidate from '@vuelidate/core'
import { required,email } from '@vuelidate/validators';
import userService from '../services/userService';
import Swal from "sweetalert2";
export default {
    setup: () => ({ v$: useVuelidate() }),
    data(){
        return{
            user: {
                name: "",
                email: "",
                password: ""
            }
        }
    },
    beforeMount() {
        this.toggleEveryDisplay();
        this.toggleHideConfig();
    },
    beforeUnmount() {
        this.toggleEveryDisplay();
        this.toggleHideConfig();
    },
    validations () {
        return {
            user:{ 
                name: {required},
                email: {required,email},
                password: {required}
            },
        }
    },
    methods:{
        ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
        async save(){
            try {
                if (!await this.v$.user.$validate()) return;
                this.LoaderSpinnerShow();
                await userService.store(this.user);
                this.LoaderSpinnerHide();
                await Swal.fire('','Usuario registrado','success');
                this.user.email='';
                this.user.password='';
                this.user.name='';
                this.$router.push({name:'signin'});
            } catch (error) {
                console.log(error);
                this.LoaderSpinnerHide();
                Swal.fire('','Ocurrio un error al procesar la solicitud','error');
            }
        }
    }
}
</script>