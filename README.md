# Desafio de Automação - Cypress + Cucumber (BDD)

Projeto de automação de testes cobrindo dois cenários: um fluxo completo de compra em um e-commerce (desafio Web) e a validação de um endpoint da API pública do Trello (desafio API).

## Tecnologias utilizadas

- **Linguagem:** JavaScript
- **Framework de testes:** Cypress
- **BDD:** Cucumber (`@badeball/cypress-cucumber-preprocessor`)
- **Bundler:** esbuild (`@bahmutov/cypress-esbuild-preprocessor`)
- **Node.js:** v24.18.0

## Estrutura do projeto

```
cypress/
├── e2e/
│   └── features/
│       ├── apiTrello.feature        # Cenário do desafio API
│       ├── webShopping.feature      # Cenário do desafio Web
│       └── steps/
│           ├── apiTrelloSteps.js
│           └── webShoppingSteps.js
├── screenshots/                     # Gerado automaticamente em falhas (ignorado no Git)
└── videos/                          # Gerado automaticamente (ignorado no Git)
cypress.config.js
package.json
```

## Pré-requisitos

Antes de instalar o projeto, é necessário ter instalado na máquina:

- [Node.js](https://nodejs.org/) (recomendado v24.x ou superior)
- npm (já vem junto com o Node.js)
- Git
- [Visual Studio Code](https://code.visualstudio.com/) (recomendado para editar e rodar o projeto)

Para verificar se já estão instalados, rode no terminal:

```bash
node -v
npm -v
git --version
```

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/jacque-moura/desafio-automacao-cypress.git
```

2. Acesse a pasta do projeto:

```bash
cd desafio-automacao-cypress
```

3. Instale as dependências:

```bash
npm install
```

> O Cypress e as demais bibliotecas do projeto (Cucumber, esbuild, etc.) são instalados automaticamente nesse passo, pois já constam como dependências no `package.json`. Não é necessário instalar o Cypress separadamente.

## Execução dos testes

### Rodar todos os testes (modo headless, via terminal)

```bash
npx cypress run --spec "cypress/e2e/features/*.feature"
```

### Rodar um desafio específico

**Desafio Web** (login, busca, carrinho e validação no pagamento):
```bash
npx cypress run --spec "cypress/e2e/features/webShopping.feature"
```

**Desafio API** (validação do endpoint do Trello):
```bash
npx cypress run --spec "cypress/e2e/features/apiTrello.feature"
```

### Rodar em modo interativo (com interface visual)

Para acompanhar a execução dos testes passo a passo, com o navegador abrindo em tempo real:

```bash
npx cypress open
```

Em seguida:
1. Selecione **E2E Testing**
2. Escolha o navegador (recomendado: Chrome)
3. Clique no arquivo `.feature` desejado na lista de specs

## Sobre os cenários

### Desafio Web — `webShopping.feature`

Site testado: [Automation Exercise](https://www.automationexercise.com)

Fluxo coberto em um único cenário ponta a ponta:
1. Acesso à página de login
2. Login com usuário válido (`teste2021@teste.com.br`)
3. Busca pelo produto "T-Shirt"
4. Inclusão do produto no carrinho
5. Validação do produto no carrinho e na tela de pagamento (checkout)

### Desafio API — `apiTrello.feature`

Endpoint testado: `GET https://api.trello.com/1/actions/592f11060f95a3d3d46a987a`

O cenário valida:
- O status code da resposta (`200`)
- A existência do campo `name` dentro da estrutura `list` da resposta, exibindo seu valor no terminal de execução

## Observações

- O `node_modules` não é versionado (consta no `.gitignore`); ele é recriado automaticamente ao rodar `npm install`.
- Screenshots e vídeos de execução também são ignorados pelo Git, pois são artefatos gerados a cada rodada de testes.
