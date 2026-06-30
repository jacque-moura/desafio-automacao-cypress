Feature: Validação da API do Trello

  Scenario: Validar o campo name da estrutura list
    When eu enviar uma requisição GET para o endpoint "/1/actions/592f11060f95a3d3d46a987a"
    Then o status code da resposta deve ser 200
    And o campo "name" dentro da estrutura "list" deve ser exibido
   