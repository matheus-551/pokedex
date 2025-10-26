import axios from "axios";

// Configuração da URL base da API do PokeAPI
axios.defaults.baseURL = "https://pokeapi.co/api/v2/";

/**
 *  
 * @param {*} offset 
 * @param {*} limit 
 * @returns Lista de Pokémons com nome, url e imagem
 */
export async function BuscarPokemons(offset = 0, limit = 20) {
  try {
    const response = await axios.get(`pokemon?offset=${offset}&limit=${limit}`);
    const pokemons = response.data.results;

    const listaPokemons = await Promise.all(
      pokemons.map(async (pokemon) => {
        const imageSrc = await ObterImagemPokemon(pokemon.url);
        return {
          nome: pokemon.name,
          url: pokemon.url,
          imageSrc,
        };
      })
    );

    return listaPokemons;
  } catch (error) {
    console.error("Erro ao buscar Pokémons:", error);
    return [];
  }
}

async function ObterImagemPokemon(url) {
  try {
    const response = await axios.get(url);
    return response.data.sprites.other.dream_world.front_default;
  } catch (error) {
    console.error("Erro ao obter imagem do Pokémon:", error);
    return null;
  }
}