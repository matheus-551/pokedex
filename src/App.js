import { container_header } from './components/Header.js'
import { Card } from './components/Card.js'
import { ErrorScreen } from './components/ErrorScreen.js'
import { Pagination } from './components/Pagination.js'

import { BuscarPokemonPorNome, BuscarPokemons } from './js/PokemonApiService.js'

import './style.css'

const app = document.getElementById('app')
app.classList.add('w-full', 'min-h-screen', 'bg-white', 'flex', 'flex-col')

// Insere o header no app
app.appendChild(container_header);

const container_cards = document.createElement('div');
container_cards.classList.add('w-full', 'grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'xl:grid-cols-5', 'gap-4', 'p-4');

const pageTitle = document.createElement('h2');
pageTitle.id = 'page-title';
pageTitle.classList.add(
    'text-2xl', 'font-bold', 'text-black',
    'text-center', 'mt-4'
);

function DefinirTitulo(text) {
    pageTitle.innerText = text;
    
    if (!document.getElementById("page-title")) {
        app.insertBefore(pageTitle, container_cards);
    }
}

function RemoverTitulo() {
    const title = document.getElementById("page-title");
    if (title) title.remove();
}

function ExibirCarregando() {
    const carregando = document.createElement('div');
    carregando.id = 'carregando';
    carregando.classList.add('w-full', 'text-xl' , 'text-center', 'text-gray-500', 'my-4');
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
    RemoverTitulo();
    ExibirCarregando();

    const oldPagination = document.getElementById('pagination-container');
    if (oldPagination) oldPagination.remove();

    const existingErrorScreen = document.getElementById('overlay');
    if (existingErrorScreen) 
        existingErrorScreen.remove();

    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    if (favoritos.length === 0) {
        RemoverCarregando();
        RemoverTitulo();  
        app.appendChild(ErrorScreen('Nenhum Pokémon favoritado ainda!'));
        
        return;
    }

    favoritos.forEach(async pokemon => {
        const cardComModal = await Card(pokemon.name, pokemon.imageSrc, pokemon.url);
        container_cards.appendChild(cardComModal);
    });

    RemoverCarregando();
    DefinirTitulo("Meus Favoritos");
    console.log('Carregamento de favoritos concluído');
    app.appendChild(container_cards);
}

export async function CarregaPokemonPorNome(nome) {
    container_cards.innerHTML = '';
    RemoverCarregando();
    RemoverTitulo(); 
    ExibirCarregando();

    const oldPagination = document.getElementById('pagination-container');
    if (oldPagination) oldPagination.remove();

    const existingErrorScreen = document.getElementById('overlay');
    if (existingErrorScreen) 
        existingErrorScreen.remove();

    BuscarPokemonPorNome(nome)
        .then(async pokemon => {
            if (pokemon) {
                const cardComModal = await Card(pokemon.name, pokemon.imagem, `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                container_cards.appendChild(cardComModal);
            } else {
                app.appendChild(ErrorScreen(`Pokémon "${nome}" não encontrado.`));
            }

            RemoverCarregando();
            console.log('Carregamento concluído');
            app.appendChild(container_cards);
        })
        .catch(error => {
            RemoverCarregando();
            app.appendChild(ErrorScreen(`Erro ao carregar o Pokémon. Tente novamente mais tarde.`));
        });
}

export async function CarregarPokemons(offset = 0, limit = 10) {
    container_cards.innerHTML = '';
    RemoverCarregando();
    RemoverTitulo();
    ExibirCarregando();

    const existingErrorScreen = document.getElementById('overlay');
    if (existingErrorScreen) 
        existingErrorScreen.remove();
    
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
            console.log('Carregando Pokémon:', pokemon);
            const urlImagem = pokemon.imageSrc;
            const cardComModal = await Card(pokemon.nome, urlImagem, pokemon.url);
            container_cards.appendChild(cardComModal);
        })

        RemoverCarregando();
        
        app.appendChild(container_cards);
        DefinirTitulo("Lista de Pokémons");

        const paginationElement = Pagination(next, previous, (newOffset, newLimit) => {
            CarregarPokemons(newOffset, newLimit);
        });

        paginationElement.id = 'pagination-container';
        app.appendChild(paginationElement);
    }).catch(error => {
        console.error("Erro ao buscar Pokémons:", error);
        RemoverCarregando();
        
        app.appendChild(ErrorScreen(`Erro ao carregar Pokémons. Tente novamente mais tarde.`));
    });
}

// executa quando o DOM es  tiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado');

    CarregarPokemons();
});