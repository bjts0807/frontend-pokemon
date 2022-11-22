<template>
  <div class="content-wrapper">
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="row">
          <div class="col-12 col-xl-8 mb-4 mb-xl-0">
            <h3 class="font-weight-bold">Detalle del Pokemon</h3>
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
                            <img :src="pokemon.sprites.other.dream_world.front_default" width="200"/>
                            <h2 class="mt-2 text-info" >{{pokemon.name}}</h2>
                            <button class="btn btn-outline-danger btn-sm" @click="favourite();"><i class="fa fa-heart fa-2x"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 mt-2" >
                    <div class="card mb-3" >
                        <div class="card card-scroll" >
                            <div class="card-body">
                                <h4 class="card-title text-info">Estadisticas</h4>
                                <ul class="list-group">
                                    <li class="list-group-item" v-for="(item,index) in pokemon.stats" :key="index">
                                        <span class="text-danger">{{item.stat.name}}: </span>
                                        <span class="badge badge-primary">{{item.base_stat}}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2" >
            <div class="card mb-3" >
                <div class="card-body text-center">
                    <h4 class="card-title">Peso</h4>
                    <h2 class="mt-2 text-primary" >{{pokemon.weight}}</h2>
                </div>
            </div>
            <div class="card mb-3" >
                <div class="card-body text-center">
                    <h4 class="card-title">Altura</h4>
                    <h2 class="mt-2 text-danger" >{{pokemon.height}}</h2>
                </div>
            </div>
            <div class="card mb-3" >
                <div class="card-body text-center">
                    <h4 class="card-title">Experiencia</h4>
                    <h2 class="mt-2 text-success" >{{pokemon.base_experience}}</h2>
                </div>
            </div>
        </div>
        <div class="col-md-6" >
            <div class="row">
                <div class="col-md-12" >
                    <div class="card card-scroll">
                        <div class="card-body">
                            <h4 class="card-title text-info">Habilidades</h4>
                            <ul class="list-group">
                                <li class="list-group-item" v-for="(item,index) in pokemon.abilities" :key="index">
                                    {{item.ability.name}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-12 mt-2" >
                    <div class="card mb-3" >
                        <div class="card card-scroll" >
                            <div class="card-body">
                                <h4 class="card-title text-info">Movimientos</h4>
                                <ul class="list-group">
                                    <li class="list-group-item" v-for="(item,index) in pokemon.moves" :key="index">
                                        {{item.move.name}}
                                    </li>
                                </ul>
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
import dashboardService from "../../services/dashboardService";
import favouriteService from "../../services/favouriteService";
import Swal from "sweetalert2";
export default {
    data(){
      return {
        url:'',
        pokemon: {},
      }
    },
    methods: {
      async showPokemon(url){
        const response = await dashboardService.show(url);
        this.pokemon = response.data;
      },
      async favourite(){
        try{
            const result = await Swal.fire({
                title :  "¿Está seguro de marcar este pokemon como favorito?",
                text : "",
                showCancelButton : true,
                showConfirmButton : true,
                confirmButtonColor: "#1a73e8",
                confirmButtonText : 'Sí',
                cancelButtonText : 'No',
                icon : "warning",
                showLoaderOnConfirm : true,
                preConfirm: async () => {
                    try{
                        let obj={
                            url:this.url
                        }
                        await favouriteService.store(obj);
                    }catch (e) {
                        console.error(e);
                        Swal.showValidationMessage('ha ocurrido un error al procesar la solicitud');
                    }
                },
            });
            if(result.isConfirmed){
                await Swal.fire('Exíto', 'Pokemon marcado como favorito', 'success');
                this.$router.push({name:'Dashboard'});
            } 
        }catch (e) {
            console.error(e);
        }
      },
    },
    created() {
        this.url=this.$route.params.url
      this.showPokemon(this.$route.params.url);
    },
  }
</script>
<style scoped>
.card-scroll {
    max-height: 300px;
    overflow-y: auto;
}
</style>