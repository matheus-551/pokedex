/**
 * Exibe uma tela de erro centralizada
 * @param {string} message - mensagem a ser exibida
 */
export function ErrorScreen(message) {
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.classList.add(
        'w-full', 'flex', 'flex-col', 'justify-center', 'items-center'
    );

    overlay.innerHTML = `
        <span class="text-xl text-gray-500 text-center flex flex-col whitespace-pre-line">
            <span class="material-symbols-outlined text-red-600" style="font-size: 64px;">
                error
            </span>
            ${message}
        </span>
    `;

    return overlay;
}
