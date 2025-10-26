import { BuscarDetalhesPokemon } from '../js/ConsumidorApi.js';

export async function Modal(url) {
    const pokemon = await BuscarDetalhesPokemon(url);
    
    if (!pokemon) {
        return document.createElement('div'); // Retorna um div vazio se não houver dados
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

        <div class="modal-action mt-6">
            <form method="dialog">
                <button class="btn bg-red-600">Favoritar</button>
                <button class="btn btn-neutral">Fechar</button>
            </form>
        </div>
    </div>
    `;

    modalContainer.appendChild(dialog);
    return modalContainer;
}
