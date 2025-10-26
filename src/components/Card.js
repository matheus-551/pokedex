export function Card(nome, urlImagem, url) {
  const card = document.createElement('div');

  card.innerHTML = `
    <div class="card bg-red-600 w-full shadow-sm p-2 rounded-t-xl">
      <figure class="px-10 pt-10 bg-white rounded-t-xl">
        <img src="${urlImagem}" alt="${nome}" class="w-full h-46 object-contain">
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${nome}</h2>
        <div class="card-actions">
          <a href="${url}" class="btn btn-neutral">Detalhes</a>
        </div>
      </div>
    </div>
  `;

  return card;
}