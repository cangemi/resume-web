# Currículo Web - Currículo Pessoal

Um currículo web (currículo online) feito com Vite + Vue 3 (Composition API) para apresentar experiência, habilidades e contato.

---

**Destaques:**

- **Leve e rápido:** desenvolvido com Vite para tempos de build e dev rápidos.
- **Vue 3:** componentes modulares em Composition API.
- **Design responsivo:** layout pensado para desktop e mobile.

---

**Demo (local):**

- Instale dependências: `npm install`
- Rodar em modo desenvolvimento: `npm run dev`
- Build para produção: `npm run build`

Abra http://localhost:5173 (ou porta indicada no terminal) após `npm run dev`.

---

## Tecnologias

- Vue 3
- Vite
- TypeScript
- Pinia (stores)

## Estrutura do projeto

Principais arquivos e pastas:

- `index.html` – template de entrada.
- `src/main.ts` – bootstrap da aplicação.
- `src/App.vue` – componente raiz.
- `src/components/` – componentes reutilizáveis (`Vcard.vue`, `CardInfo.vue`, `Background.vue`, `LangSwitcher.vue`).
- `src/views/` – views/rotas (ex.: `Home.vue`).
- `src/router/index.ts` – definição de rotas.
- `src/stores/` – stores do Pinia.
- `src/data/gridCells.ts` – dados usados pela UI.
- `public/images/` – imagens estáticas.

## Como contribuir

1. Fork este repositório.
2. Crie uma branch (`git checkout -b feat/minha-melhoria`).
3. Faça commits claros e descritivos.
4. Abra um Pull Request explicando a mudança.

Sugestões: melhorias de acessibilidade, novos componentes, otimização de imagens.

## Boas práticas locais

- Node.js 18+ recomendado.
- Use `npm ci` em pipelines para instalações reprodutíveis.

## Licença

Licença MIT — sinta-se livre para usar e modificar este projeto. Adicione créditos se publicar publicamente.

---

## Contato

Se quiser entrar em contato ou colaborar, abra uma issue ou PR no GitHub.

# Boa sorte e obrigado por ver o projeto! 🚀

# Currículo Web

Este template ajuda a começar com Vue 3 em Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
