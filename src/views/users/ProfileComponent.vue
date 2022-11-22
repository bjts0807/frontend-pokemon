<template>
  <div class="content-wrapper">
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="row">
          <div class="col-12 col-xl-8 mb-4 mb-xl-0">
            <h3 class="font-weight-bold">Perfil del Usuario</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
        <div class="col-md-4" >
            <div class="row">
                <div class="col-md-12">
                    <div class="card mb-3">
                        <div class="card-body text-center">
                            <img src="../../../public/asset/images/faces/face1.png" width="200"/>
                            <h3 class="mt-2 text-info" >{{user.name}}</h3>
                        </div>
                    </div>
                </div>
                <div class="col-md-12" >
                    <div class="card card-scroll">
                        <div class="card-body">
                            <h4 class="card-title text-info">Datos basicos</h4>
                            <ul class="list-group">
                                <li class="list-group-item">
                                    <span class="text-primary">Email:</span> {{user.email}}
                                </li>
                                <li class="list-group-item">
                                    <span class="text-primary">Direccion:</span> {{user.address}}
                                </li>
                                <li class="list-group-item">
                                    <span class="text-primary">Ciudad:</span> {{user.city}}
                                </li>
                                <li class="list-group-item">
                                    <span class="text-primary">Fecha de Cumpleaños:</span> {{user.birthday}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-8" >
            <div class="row">
                <div class="col-md-12 mt-2" >
                    <div class="card mb-3" >
                        <div class="card" >
                            <div class="card-body">
                                <h4 class="card-title text-info">Actualizar datos</h4>
                                <div class="form-group">
                                    <label class="form-label">Direccion</label>
                                    <input type="text" v-model="profile.address" class="form-control form-control-sm"  placeholder="Direccion">
                                    <div v-if="v$.profile.address.$error" class="text-danger" style="font-size:14px" >
                                        <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                                    </div>
                                </div>
                               
                                <div class="form-group">
                                    <label class="form-label">Ciudad</label>
                                    <input type="text" v-model="profile.city" class="form-control form-control-sm"  placeholder="Ciudad">
                                    <div v-if="v$.profile.city.$error" class="text-danger" style="font-size:14px" >
                                        <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="form-label">Fecha de Cumpleaños</label>
                                    <input type="date" v-model="profile.birthday" class="form-control form-control-sm"  >
                                    <div v-if="v$.profile.birthday.$error" class="text-danger" style="font-size:14px" >
                                        <i class="fa fa-warning fa-fw"></i> Este campo es requerido.
                                    </div>
                                </div>

                                <button class="btn btn-primary btn-sm" @click="update();">Guardar <i class="fa fa-save fa-fw"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import userService from "../../services/userService";
import Swal from "sweetalert2";
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators';

export default {
    setup: () => ({ v$: useVuelidate() }),
    data(){
      return {
        profile:{
            birthday:'',
            city:'',
            address:'',
        },
        user:{}
      }
    },
     validations () {
        return {
            profile:{ 
                birthday: {required},
                city: {required},
                address: {required}
            },
        }
    },
    methods: {
      async update(){
        try{   
             
            if (!await this.v$.profile.$validate()) return;
            this.LoaderSpinnerShow();
            await userService.update(this.profile);
            this.LoaderSpinnerHide();
            await Swal.fire('','Datos actualizados','success');
            this.$router.push({name:'Dashboard'});
        }catch (e) {
            this.LoaderSpinnerHide();
            console.error(e);
            Swal.fire('','ha ocurrido un error al procesar la solicitud','error');
        }
      },
    },
    async created() {
        this.LoaderSpinnerShow();
        const response= await userService.show(this.$store.state.user.id);
        this.user=response.data;
        this.LoaderSpinnerHide();
    }
  }
</script>
<style scoped>
.card-scroll {
    max-height: 300px;
    overflow-y: auto;
}
</style>