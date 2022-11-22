<template>
  <div class="content-wrapper">
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="row">
          <div class="col-12 col-xl-8 mb-4 mb-xl-0">
            <h3 class="font-weight-bold">Bienvenido</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 grid-margin transparent">
        <div class="row">
          <div class="col-md-3 " v-for="(item,index) in pokemons.results" :key="index">
            <router-link  :to="{name:'pokemon.show',params:{'url':item.url}}">
              <show-pokemon :url="item.url" :key="item.name"></show-pokemon>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 text-center">
      <div class="form-group">
        <button class="btn btn-danger mx-2" v-if="pokemons.previous" @click="previous(pokemons.previous)"><i class="fa fa-long-arrow-alt-left fa-fw"></i> Aterior</button>
        <button class="btn btn-primary" @click="next(pokemons.next)">Siguiente <i class="fa fa-long-arrow-alt-right"></i></button>
      </div>
    </div>
  </div>
</template>
<script>
import dashboardService from "../services/dashboardService";
import showPokemon from "./showPokemon";
  export default {
    components:{showPokemon},
    data(){
      return {
        pokemons: [],
      }
    },
    methods: {
      async allPokemons(){
        const response = await dashboardService.getPokemons();
        this.pokemons = response.data;
      },
      async next(url){
        await this.LoaderSpinnerShow();
        const response = await dashboardService.getNextPokemons(url);
        this.pokemons = response.data;
        await this.LoaderSpinnerHide();
      },
       async previous(url){
        await this.LoaderSpinnerShow();
        const response = await dashboardService.getPreviousPokemons(url);
        this.pokemons = response.data;
        await this.LoaderSpinnerHide();
      }
    },
    async created() {
      await this.LoaderSpinnerShow();
      this.allPokemons();
      await this.LoaderSpinnerHide();
    },
  }
</script>