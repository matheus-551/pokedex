import { Modal } from './Modal.js'; // se você já tiver o componente Modal

export async function Card(nome, urlImagem, url) {
  const card = document.createElement('div');
  card.classList.add('card', 'bg-red-600', 'w-full', 'shadow-sm', 'p-2', 'rounded-t-xl');

  card.innerHTML = `
    <figure class="px-10 pt-10 bg-white rounded-t-xl">
      <img src="${urlImagem}" alt="${nome}" class="w-full h-46 object-contain">
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title capitalize">${nome}</h2>
      <div class="card-actions">
        <button class="btn btn-neutral">Detalhes</button>
      </div>
    </div>
  `;

  // Cria o modal para este card
  const modal = await Modal(url);

  // Pega o botão "Detalhes"
  const buttonDetalhes = card.querySelector('button');
  const dialog = modal.querySelector('dialog');

  // Adiciona o evento de clique para abrir o modal
  buttonDetalhes.addEventListener('click', () => {
    dialog.showModal();
  });

  // Container que junta card + modal
  const container = document.createElement('div');
  container.appendChild(card);
  container.appendChild(modal);

  return container;
}
