import axios from "axios";

// Configuração da URL base da API do PokeAPI
axios.defaults.baseURL = "https://pokeapi.co/api/v2/";

/**
 *  
 * @param {Number} offset 
 * @param {Number} limit 
 * @returns Lista de Pokémons com nome, url e imagem
 */
export async function BuscarPokemons(offset = 0, limit = 10) {
  try {
    const response = await axios.get(`pokemon?offset=${offset}&limit=${limit}`);
    const { results, previous, next} = response.data;

    const pokemons = await Promise.all(
      results.map(async pokemon => ({
        nome: pokemon.name,
        url: pokemon.url,
        imageSrc: await ObterImagemPokemon(pokemon.url)
      }))
    );

    console.log({ results: pokemons,previous: previous, next: next  })
    return { results: pokemons,previous: previous, next: next  };
  } catch (error) {
    console.error(error);
    return { results: [], next: null, previous: null };
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