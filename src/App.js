import { container_header } from './components/Header.js'
import { Card } from './components/Card.js'
import { AlertError } from './components/Alert.js'

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

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM carregado');

    let isLoading = true;
    let errorElement = null;

    if (isLoading) {
        ExibirCarregando();
    }

    BuscarPokemons(0, 20).then(pokemons => {
        console.log('✅ Pokémons carregados:', pokemons);
        pokemons.forEach(async pokemon => {
            const urlImagem = await pokemon.imageSrc;
            const card = Card(pokemon.nome, urlImagem, pokemon.url);
            console.log(pokemon.nome, pokemon.imageSrc, pokemon.url); // 👀
            container_cards.appendChild(card);
        });

        RemoverCarregando();
        console.log('✅ Carregamento concluído');
        app.appendChild(container_cards);
        isLoading = false;
    }
    ).catch(error => {
        console.error("Erro ao buscar Pokémons:", error);
        RemoverCarregando();
        errorElement = AlertError(`Erro ao carregar Pokémons. Tente novamente mais tarde.`);
        app.appendChild(errorElement);
        isLoading = false;
    });
});