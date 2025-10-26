const container_header = document.createElement('div');
container_header.classList.add('w-full', 'flex-col', 'justify-center', 'items-center', 'mb-4', 'bg-red-600', 'shadow-sm');

// criar a barra de navegação
const navbar = document.createElement('div');
navbar.innerHTML = `
    <div class="navbar" id="navbar">
        <div class="flex-1">
            <div class="flex items-center justify-start flex-1">
                <img src="/pokeball.png" alt="Pokeball" class="w-8 h-8 inline-block mr-2">
                <h1 class="text-white text-3xl font-bold text-center">Pokedex</h1>
            </div>
        </div>
        <div class="h-full flex justify-center items-center gap-2" id="conteiner_icons_navbar">
            <span class="material-symbols-outlined cursor-pointer">
                favorite
            </span>
        </div>
    </div>
`

const formSearch = document.createElement('div');
formSearch.innerHTML = `
  <div class="w-full p-2 flex items-center justify-center">
      <input type="text" class="input bg-white text-black" placeholder="Diz ai quem tu queres">
      <button class="btn btn-neutral ml-2">Buscar</button>
  </div>
`;


container_header.appendChild(navbar);
container_header.appendChild(formSearch);

export { container_header };