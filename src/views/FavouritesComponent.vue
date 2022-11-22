<template>
  <div class="content-wrapper">
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="row">
          <div class="col-12 col-xl-8 mb-4 mb-xl-0">
            <h3 class="font-weight-bold">Listado de favoritos  <i class="fa fa-heart fa-2x text-danger"></i></h3>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 grid-margin transparent">
        <div class="alert alert-info" v-if="!Object.keys(favourites).length">Sin Favoritos...</div>
        <div class="row" v-else>
          <div class="col-md-3 " v-for="(item,index) in favourites" :key="index">
            <show-pokemon :url="item.ref_api" :key="item.id"></show-pokemon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import favouriteService from "../services/favouriteService";
import showPokemon from "./showPokemon";
  export default {
    components:{showPokemon},
    data(){
      return {
        favourites: [],
      }
    },
    methods: {
      async allFavourites(){
        await this.LoaderSpinnerShow();
        const response = await favouriteService.index();
        this.favourites = response.data;
        await this.LoaderSpinnerHide();
      },
    },
    async created() {
      this.allFavourites();
    },
  }
</script>