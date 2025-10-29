# Pokedex

Pokedex simples em JavaScript puro (DOM), usando Axios para chamadas à API e Tailwind CSS para estilos.

## Link para o projeto publicado

[Pokedex](https://vercel.com/matheus551s-projects/pokedex "Pokedex")

## Tecnologias

- JavaScript (ES modules / CommonJS conforme package.json)
- Axios
- Tailwind CSS (CLI)
- DaisyUI (componentes Tailwind)
- Vite (dev server / build)

## Estrutura de pastas (proposta)

```bash
pokedex/
├── public/
├── src/
│ ├── components/
│ │ └── Card.js
│ │ └── ErrorScreen.js
│ │ └── Header.js
│ │ └── Modal.js
│ │ └── Pagination.js
│ ├── js/
│ │ └── PokemonApiService.js
│ ├── App.js  // Arquivo principal
│ ├── style.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

A estrutura real pode variar; ajuste conforme necessário.

## Como rodar localmente (Windows)

1. Instalar dependências:

   ```bash
      npm install
   ```

2. Em outro terminal, iniciar o servidor de desenvolvimento (Vite) - (Caso tenha realizado o build-watch):
   ```bash
      npm run dev
   ```
3. Abrir no navegador:
   `http://localhost:5173 (ou a porta indicada pelo Vite)`

## Build e preview (produção)

- Gerar build:
  npm run build

- Visualizar build localmente:
  npm run preview

## Observações

- Certifique-se de que index.html referencia src/css/output.css (gerado pelo script build:css).
- Se preferir automatizar tudo, abra dois terminais: um para o watch do Tailwind e outro para o Vite.
