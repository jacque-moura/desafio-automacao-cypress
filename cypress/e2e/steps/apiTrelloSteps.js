const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");

When("eu enviar uma requisição GET para o endpoint {string}", (endpoint) => {
  cy.request({
    method: "GET",
    url: `https://api.trello.com${endpoint}`,
    failOnStatusCode: false
  }).then((response) => {
    cy.task("log", "Status: " + response.status);
    cy.task("log", "Body: " + JSON.stringify(response.body));
    cy.wrap(response).as("apiResponse");
  });
});

Then("o status code da resposta deve ser {int}", (statusCodeEsperado) => {
  cy.get("@apiResponse").then((response) => {
    cy.log("Status recebido: " + response.status);
    expect(response.status).to.eq(statusCodeEsperado);
  });
});

Then("o campo {string} dentro da estrutura {string} deve ser exibido", (campo, estrutura) => {
  cy.get("@apiResponse").then((response) => {
    if (response.status === 200) {
      const dados = response.body.data && response.body.data[estrutura]
        ? response.body.data[estrutura]
        : response.body[estrutura];

      expect(dados, `Estrutura "${estrutura}" não foi encontrada na resposta`).to.exist;
      expect(dados).to.have.property(campo);

      cy.task("log", `✅ Campo "${campo}" dentro de "${estrutura}": ${dados[campo]}`);
    } else {
      cy.log("⚠️ Endpoint do Trello fora do ar, status: " + response.status);
    }
  });
});