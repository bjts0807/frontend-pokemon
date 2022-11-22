import axios from 'axios';

export default ({
    
    getPokemons() {
        return axios.get(`https://pokeapi.co/api/v2/pokemon`);
    },
    getNextPokemons(url) {
        return axios.get(`${url}`);
    },
    getPreviousPokemons(url){
        return axios.get(`${url}`);
    },
    show(url){
        return axios.get(url);
    },
});