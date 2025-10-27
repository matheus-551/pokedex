import { container_header } from './components/Header.js'
import { Card } from './components/Card.js'
import { AlertError } from './components/Alert.js'
import { Pagination } from './components/Pagination.js'

import { BuscarPokemonPorNome, BuscarPokemons } from './js/ConsumidorApi.js'

import './style.css'

const app = document.getElementById('app')
app.classList.add('w-full', 'bg-white', 'flex-col')

// Insere o header no app
app.appendChild(container_header);

const container_cards = document.createElement('div');
container_cards.classList.add('w-full', 'grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'xl:grid-cols-5', 'gap-4', 'p-4');

function ExibirCarregando() {
    const carregando = document.createElement('div');
    carregando.id = 'carregando';
    carregando.classList.add('w-full', 'text-center', 'text-gray-500', 'my-4');
    carregando.innerText = 'Carregando Pokémons...';

    app.appendChild(carregando);
}

function RemoverCarregando() {
    const carregando = document.getElementById('carregando');
    if (carregando) {
        carregando.remove();
    }
}

export function CarregarFavoritos() {
    container_cards.innerHTML = '';
    RemoverCarregando();
    ExibirCarregando();

    const oldPagination = document.getElementById('pagination-container');
    if (oldPagination) oldPagination.remove();

    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    if (favoritos.length === 0) {
        RemoverCarregando();
        app.appendChild(AlertError('Nenhum Pokémon favoritado.'));
        return;
    }

    favoritos.forEach(async pokemon => {
        const cardComModal = await Card(pokemon.name, pokemon.imageSrc, pokemon.url);
        container_cards.appendChild(cardComModal);
    });

    RemoverCarregando();
    console.log('Carregamento de favoritos concluído');
    app.appendChild(container_cards);
}

export async function CarregaPokemonPorNome(nome) {
    container_cards.innerHTML = '';
    RemoverCarregando();
    ExibirCarregando();

    const oldPagination = document.getElementById('pagination-container');
    if (oldPagination) oldPagination.remove();

    BuscarPokemonPorNome(nome)
        .then(async pokemon => {
            if (pokemon) {
                const cardComModal = await Card(pokemon.name, pokemon.imagem, `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                container_cards.appendChild(cardComModal);
            } else {
                app.appendChild(AlertError(`Pokémon "${nome}" não encontrado.`));
            }

            RemoverCarregando();
            console.log('Carregamento concluído');
            app.appendChild(container_cards);
        })
        .catch(error => {
            RemoverCarregando();
            app.appendChild(AlertError(`Erro ao carregar o Pokémon. Tente novamente mais tarde.`));
        });
}

async function CarregarPokemons(offset = 0, limit = 10) {
    container_cards.innerHTML = '';
    RemoverCarregando();
    ExibirCarregando();
    
    const oldPagination = document.getElementById('pagination-container');
    if (oldPagination) 
        oldPagination.remove();

    let previous = null;
    let next = null;

    BuscarPokemons(offset, limit)
    .then(response => {
        previous = response.previous;
        next = response.next;
        
        response.results.forEach(async pokemon => {
            console.log(pokemon);
            const urlImagem = pokemon.imageSrc;
            const cardComModal = await Card(pokemon.nome, urlImagem, pokemon.url);
            container_cards.appendChild(cardComModal);
        })

        RemoverCarregando();
        
        app.appendChild(container_cards);

        const paginationElement = Pagination(next, previous, (newOffset, newLimit) => {
            CarregarPokemons(newOffset, newLimit);
        });

        paginationElement.id = 'pagination-container';
        app.appendChild(paginationElement);
    }).catch(error => {
        console.error("Erro ao buscar Pokémons:", error);
        RemoverCarregando();
        
        app.appendChild(AlertError(`Erro ao carregar Pokémons. Tente novamente mais tarde.`));
    });
}

// executa quando o DOM es  tiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado');

    CarregarPokemons();
});