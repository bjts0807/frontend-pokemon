<template>
    <div class="card mb-3 text-center shadow-sm">
        <div class="card-body" style="height: 175px">
            <img :src="pokemon_url" class="img-responsive" />
        </div>
        <div class="card-footer">
            <h3 class="mt-2 text-info" >{{pokemon.name}}</h3>
        </div>
    </div>
</template>
<script>
import dashboardService from "../services/dashboardService";
import {isEmpty} from "lodash";
export default {
    props:['url'],
     data(){
      return {
        pokemon: {},
      }
    },
    computed:{
        pokemon_url:function(){
            if(!isEmpty(this.pokemon)){
                return this.pokemon.sprites.other.dream_world.front_default;
            }
            return '';
        }
    },
    watch: {
        url:function (){
            dashboardService.show(this.url).then((x)=>{
                this.pokemon= x.data;
            });
        }
    },
    created (){
        dashboardService.show(this.url).then((x)=>{
            this.pokemon= x.data;
        });
    }

}
</script>
<style scoped>
    .img-responsive{
        height:100% ;
        width:auto ;
    }
</style>