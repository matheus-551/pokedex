import { BuscarDetalhesPokemon } from '../js/ConsumidorApi.js';
import { CarregarFavoritos } from '../App.js';

export async function Modal(url) {
    const pokemon = await BuscarDetalhesPokemon(url);
    
    if (!pokemon) {
        return document.createElement('div');
    }

    const modalContainer = document.createElement('div');

    const dialog = document.createElement('dialog');
    dialog.classList.add('modal', 'modal-bottom', 'sm:modal-middle');

    dialog.innerHTML = `
     <div class="modal-box bg-white text-black max-w-2xl">
        <h2 class="text-lg font-semibold capitalize mb-4">${pokemon.name}</h2>
        
        <div class="flex flex-row items-center justify-center gap-8">
            
            <!-- Imagem -->
            <div class="flex justify-center items-center">
                <img src="${pokemon.imagem}" alt="${pokemon.name}" class="w-40 h-40 object-contain">
            </div>

            <!-- Informações -->
            <div class="flex flex-col justify-center text-left">
                <h3 class="text-lg font-bold mb-3">Informações</h3>
                <div class="flex flex-col gap-1 text-sm">
                    <span><strong>Id:</strong> ${pokemon.id}</span>
                    <span><strong>Altura:</strong> ${pokemon.height}</span>
                    <span><strong>Peso:</strong> ${pokemon.weight}</span>
                    <span><strong>Tipo(s):</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</span>
                </div>
            </div>
        </div>

        <div class="modal-action mt-6 flex justify-end gap-2">
            <button id="btn_favoritar" class="btn bg-red-600 text-white">Favoritar</button>
            <button id="btn_fechar" class="btn btn-neutral">Fechar</button>
        </div>
    </div>
    `;

    modalContainer.appendChild(dialog);

    const buttonFavoritar = dialog.querySelector('#btn_favoritar');
    const buttonFechar = dialog.querySelector('#btn_fechar');

    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    const isFavorito = favoritos.some(f => f.name === pokemon.name);
    if (isFavorito) {
        buttonFavoritar.innerText = 'Remover dos favoritos';
        buttonFavoritar.classList.remove('bg-red-600');
        buttonFavoritar.classList.add('bg-gray-500');
    }

    buttonFavoritar.addEventListener('click', async () => {
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        const index = favoritos.findIndex(f => f.name === pokemon.name);

        if (index === -1) {
            favoritos.push({
                name: pokemon.name,
                url: url,
                imageSrc: pokemon.imagem
            });
            localStorage.setItem('favoritos', JSON.stringify(favoritos));

            buttonFavoritar.innerText = 'Remover dos favoritos';
            buttonFavoritar.classList.remove('bg-red-600');
            buttonFavoritar.classList.add('bg-gray-500');
        } else {
            favoritos.splice(index, 1);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));

            buttonFavoritar.innerText = 'Favoritar';
            buttonFavoritar.classList.remove('bg-gray-500');
            buttonFavoritar.classList.add('bg-red-600');
            
            dialog.close();

            await CarregarFavoritos();
        }
    });

    buttonFechar.addEventListener('click', () => {
        dialog.close();
    });

    return modalContainer;
}
