export function Pagination(next, previous, onPageClick) {
    const pagination = document.createElement('div');
    pagination.classList.add('join', 'flex', 'justify-center', 'my-4', 'gap-2');

    // Botão "Anterior"
    const buttonPrevious = document.createElement('button');
    buttonPrevious.classList.add('join-item', 'btn', 'btn-outline', 'bg-neutral', 'text-white');
    buttonPrevious.innerText = 'Anterior';

    if (!previous) {
        buttonPrevious.disabled = true;
        buttonPrevious.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        buttonPrevious.addEventListener('click', () => {
            const urlObj = new URL(previous);
            const offset = parseInt(urlObj.searchParams.get('offset')) || 0;
            const limit = parseInt(urlObj.searchParams.get('limit')) || 10;
            onPageClick(offset, limit); // já passa offset e limit
        });
    }

    // Botão "Próximo"
    const buttonNext = document.createElement('button');
    buttonNext.classList.add('join-item', 'btn', 'btn-outline', 'bg-neutral', 'text-white');
    buttonNext.innerText = 'Próximo';

    if (!next) {
        buttonNext.disabled = true;
        buttonNext.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        buttonNext.addEventListener('click', () => {
            const urlObj = new URL(next);
            const offset = parseInt(urlObj.searchParams.get('offset')) || 0;
            const limit = parseInt(urlObj.searchParams.get('limit')) || 10;
            onPageClick(offset, limit); // já passa offset e limit
        });
    }

    pagination.appendChild(buttonPrevious);
    pagination.appendChild(buttonNext);

    return pagination;
}