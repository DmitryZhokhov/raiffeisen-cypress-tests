// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('step_1', (phoneNumber, confirmationCode) => {
    cy.check_step_header(1, 'Введите номер телефона')
    cy.get('input[name="mobilePhone"]').type(`${phoneNumber}`)
    cy.get('div[data-step="1"] button[data-context="next"]').click()
    cy.get('input[name="mobilePhoneConfirmation"]').type(`${confirmationCode}`)
})
Cypress.Commands.add('step_2', (fullName, birthday, email) => {
    cy.check_step_header(3, 'Заполните контактные данные')
    cy.get('textarea[name="name"]').type(`${fullName}{enter}`)
    cy.wait(500)
    cy.intercept('POST', 'Request URL: https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio', {
    statusCode: 200,
    body: {
      name: fullName,
    },
  })
    cy.get('input[name="birthday"]').type(birthday)
    cy.get('input[placeholder="email@domain.ru"]').type(email)
    cy.get('div[data-step="3"] button[data-context="next"]').should('not.be.disabled').click()
})
Cypress.Commands.add('step_3', (passportSeriaNumber, passportIssueByCode, passportIssueDate, passportIssuePlace) => {
    cy.check_step_header(4, 'Дмитрий, укажите паспортные данные')
    cy.get('input[name="passportSeriaNumber"]').type(passportSeriaNumber)
    cy.get('input[name="passportIssueByCode"]').type(passportIssueByCode)
    cy.get('input[name="passportIssueDate"]').type(passportIssueDate)
    cy.get('textarea[name="passportIssuePlace"]').type(passportIssuePlace)
    cy.get('div[data-step="4"] button[data-context="next"]').should('not.be.disabled').click()
})
Cypress.Commands.add('step_4', (birthPlace, permanentAddress) => {
    cy.check_step_header(5, 'Дмитрий, заполните информацию')
    cy.get('textarea[name="birthPlace"]').type(`${birthPlace}{enter}`)
    cy.get('textarea[name="permanentAddress"]').type(`${permanentAddress}{enter}`)
    cy.get('span').contains('Только РФ').click()
    cy.get('div[data-step="5"] button[data-context="next"]').should('not.be.disabled').click()
})
Cypress.Commands.add('step_5', (deliveryAddress) => {
  cy.get('textarea[name="deliveryAddress"]').type(`${deliveryAddress}{enter}`)
  cy.get('span').contains('Бесплатная доставка').click()
  cy.intercept('POST', 'https://oapi.raiffeisen.ru/api/forms/public/v1.0/forms/debit-card-single-field/66/answers', {
      body: {
        "success": true,
        "error": {
          "code": 0,
          "message": ""
        },
        "meta": [],
        "data": {
          "payload": {
            "answerId": 99999999,
            "reuseToken": "ed958b64-129e-1111-89d4-48535286570a"
          },
          "analytics": {
            "formName": "DEBIT_CARD_FULL_FORM"
          }
        }
      }
    }).as('request')
  cy.get('div[data-step="6"] button[data-context="next"]').click()
  cy.wait('@request', {timeout: 20000}).its('request.body.auth').then((auth) => {

      expect(auth.phone).to.equal("71111111111")
      expect(auth.token).to.equal("YD5j3gq0eyQI8xJQ/Dpx7Cas")

  })
})
Cypress.Commands.add('check_result', (text) => {
    cy.get('div[class="ccform-thx-page__row ccform-thx-page__row--last"] div[class="ccform-thx-page__title"]').contains(text).should('be.visible')
})
Cypress.Commands.add('check_step_header', (step, text) => {
  cy.get(`span[data-step-visible="${step}"]`).contains(text).should('be.visible')
})