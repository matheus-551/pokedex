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
        id: pokemon.id,
        nome: pokemon.name,
        url: pokemon.url,
        imageSrc: `http://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`
      }))
    );

    return { results: pokemons,previous: previous, next: next  };
  } catch (error) {
    console.error(error);
    return { results: [], next: null, previous: null };
  }
}

export async function BuscarPokemonPorNome(nome) {
  try {
    const response = await axios.get(`pokemon/${nome.toLowerCase()}`);
    const { name } = response.data;
    const imagem =`http://img.pokemondb.net/artwork/large/${name}.jpg` 
    return { name, imagem };
  } catch (error) {
    console.error("Erro ao buscar Pokémon por nome:", error);
    return null;
  }
}

export async function BuscarDetalhesPokemon(url) {
  try {
    const response = await axios.get(url);
    const { id, name, height, weight, types, sprites } = response.data;

    const imagem = `http://img.pokemondb.net/artwork/large/${name}.jpg`;

    return {
      id,
      name,
      height,
      weight,
      types,
      imagem
    };
  } catch (error) {
    console.error("Erro ao buscar detalhes do Pokémon:", error);
    return null;
  }
}