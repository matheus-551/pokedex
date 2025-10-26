import { container_header } from './components/Header.js'
import { Card } from './components/Card.js'
import { AlertError } from './components/Alert.js'
import { Pagination } from './components/Pagination.js'

import { BuscarPokemons } from './js/ConsumidorApi.js'

import './style.css'

const app = document.getElementById('app')
app.classList.add('w-full', 'bg-white', 'flex-col')

// Insere o header no app
app.appendChild(container_header);

const container_cards = document.createElement('div');
container_cards.classList.add('w-full', 'grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'xl:grid-cols-5', 'gap-4', 'p-4');

function ExibirCarregando() {
    console.log('⏳ Exibindo carregando...');
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

function CarregarPokemons(offset = 0, limit = 10) {
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
            const card = Card(pokemon.nome, urlImagem, pokemon.url);
            container_cards.appendChild(card);
        })

        RemoverCarregando();
        
        console.log('Carregamento concluído');
        
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

// executa quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado');

    CarregarPokemons();
    // CarregarPokemons(0, 10); 

    // let isLoading = true;
    // let errorElement = null;

    // if (isLoading) {
    //     ExibirCarregando();
    // }

    // BuscarPokemons(0, 10).then(pokemons => {
    //     console.log('Pokémons carregados:', pokemons);
    //     pokemons.forEach(async pokemon => {
    //         const urlImagem = await pokemon.imageSrc;
    //         const card = Card(pokemon.nome, urlImagem, pokemon.url);
    //         console.log(pokemon.nome, pokemon.imageSrc, pokemon.url); // 👀
    //         container_cards.appendChild(card);
    //     });

    //     RemoverCarregando();
        
    //     console.log('Carregamento concluído');
        
    //     app.appendChild(container_cards);
    //     isLoading = false;
    // }
    // ).catch(error => {
    //     console.error("Erro ao buscar Pokémons:", error);
    //     RemoverCarregando();
        
    //     errorElement = AlertError(`Erro ao carregar Pokémons. Tente novamente mais tarde.`);
        
    //     app.appendChild(errorElement);
    //     isLoading = false;
    // });
});