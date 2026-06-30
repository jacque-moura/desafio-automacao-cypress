Feature: Compras no site Automation Exercise

  Scenario: Login, busca, adição ao carrinho e validação no pagamento
    Given que eu navegue até a página de login do "Automation Exercise"
    When eu realizar o login com o usuário "teste2021@teste.com.br" e senha "teste"
    And pesquisar pelo produto "T-Shirt" na barra de busca
    And adicionar o produto encontrado ao carrinho
    Then eu devo validar na tela de pagamento que o produto "T-Shirt" foi incluído corretamente