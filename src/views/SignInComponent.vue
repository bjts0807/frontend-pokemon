<template>
    <div>
    <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">
              <div class="brand-logo">
               <h2 class="text-primary">Prueba tecnica</h2>
              </div>
              <form class="pt-3">
                <div class="form-group" v-if="has_error">
                  <div class="alert alert-danger alert-dismissible fade show w-100 d-block" role="alert">
                    <i class="fas fa-exclamation-triangle fa-fw"></i>
                    <div v-text="message"></div>
                  </div>
                </div>
                <div class="form-group">
                  <input type="email" v-model="form.email" class="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username">
                </div>
                <div v-if="v$.form.email.$error" class="text-danger" style="font-size:14px" >
                  <i class="fa fa-warning fa-fw"></i> Por favor ingrese su e-mail.
                </div>
                <div class="form-group">
                  <input type="password" v-model="form.password" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password">
                </div>
                <div v-if="v$.form.password.$error" class="text-danger" style="font-size:14px" >
                  <i class="fa fa-warning fa-fw"></i> Por favor ingrese su contraseña.
                </div>
                <div class="mt-3">
                  <a class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" @click.prevent="login()">ACCEDER</a>
                </div>
                <div class="mb-2 mt-2">
                  <router-link :to="{name:'users.register'}" class="btn btn-block btn-outline-info auth-form-btn">
                    <i class="ti-plus mr-2"></i>Registrate
                  </router-link>
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
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import useVuelidate from '@vuelidate/core'
import { required ,email} from '@vuelidate/validators';
export default {
  name: "signinComponent",
  setup: () => ({ v$: useVuelidate() }),
  data (){
    return {
      form: {
          email: "",
          password: "",
      },
      has_error : false,
      message : "",
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
  validations(){
    return {
      form: {
          email: { required, email },
          password: { required },
      }
    }
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    async login() {
      try{

        if (!await this.v$.form.$validate()) return;

        this.LoaderSpinnerShow();

        await this.$store.dispatch("login", this.form);
        this.LoaderSpinnerHide();
      }catch(error){
          this.LoaderSpinnerHide();
          switch(error.response.status){
              case 422:
                  this.has_error = true;
                  this.message = "Usuario o contraseña incorrectos";
                  break;
                case 401:
                      this.has_error = true;
                      this.message = "Usuario o contraseña incorrectos";
              break;
              default :
                  this.has_error = true;
                  this.message = "Ha ocurrido un error, por favor intente nuevamente";
              break;
          }
      }
    }
  },
};
</script>