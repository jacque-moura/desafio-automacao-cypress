const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

// Passo Inicial: Acessar o site
Given("que eu navegue até a página de login do {string}", (site) => {
  cy.visit("/login");
  // Garante que a página carregou verificando o título visível
  cy.get('.login-form').should('be.visible');
});

// Passo de Login
When("eu realizar o login com o usuário {string} e senha {string}", (usuario, senha) => {
  // Nota: O site de teste costuma exigir cadastro prévio. Se o usuário fornecido 
  // pelo processo não existir, você pode criar um manualmente no site ou usar este comando:
  cy.get('[data-qa="login-email"]').type(usuario);
  cy.get('[data-qa="login-password"]').type(senha);
  cy.get('[data-qa="login-button"]').click();
  
  // Valida que o login deu certo procurando o botão de Logout ou nome do usuário
  cy.get('a[href="/logout"]').should('be.visible');
});

// Passo de Busca do Produto
When("pesquisar pelo produto {string} na barra de busca", (produto) => {
  cy.visit("/products");
  cy.get('#search_product').type(produto);
  cy.get('#submit_search').click();
  cy.get('.title').should('contain', 'Searched Products');
});

// Passo de Adicionar ao Carrinho
When("adicionar o produto encontrado ao carrinho", () => {
  // Passa o mouse ou clica direto no botão de adicionar do primeiro produto da busca
  cy.get('.features_items .single-products').first().within(() => {
    cy.contains('Add to cart').click();
  });
  // Clica no link para ir para a tela do carrinho no modal que aparece
  cy.contains('View Cart').click();
});

Then("eu devo validar na tela de pagamento que o produto {string} foi incluído corretamente", (produto) => {
  // Valida o produto na tela do carrinho
  cy.get('#cart_info_table').should('be.visible');
  cy.get('.cart_description').should('contain', produto);

  // Avança para a tela de pagamento (checkout)
  cy.contains('Proceed To Checkout').click();

  // Valida o produto na revisão do pedido (estrutura diferente do carrinho)
  cy.contains('Review Your Order').should('be.visible');
  cy.get('.cart_description').should('contain', produto);
});