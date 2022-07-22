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

Cypress.Commands.add('check_step_header', (step) => {
  cy.get('[data-step-hidden="2"]', {timeout: 10000}).should('have.text', ` (шаг ${step} из 5)`)
})

Cypress.Commands.add('step_1_phone_validation', (phoneNumber, confirmationCode) => {
  cy.check_step_header('1')
  cy.get('input[name="mobilePhone"]').type(`${phoneNumber}`)
  cy.get('div[data-step="1"] button[data-context="next"]').click()
  cy.get('input[name="mobilePhoneConfirmation"]').type(`${confirmationCode}`)
})

Cypress.Commands.add('step_2_contact_details', (surname, name, patronymic, gender, genderValue, birthday, email) => {
  cy.check_step_header('2')
  cy.get('textarea[name="name"]').type(`${surname} ${name} ${patronymic}{enter}`)
  const staticResponse = {
    body: {
    "suggestions":[{"value":`${surname} ${name} ${patronymic}`,"unrestricted_value":`${surname} ${name} ${patronymic}`,"data":{"surname":`${surname}`,"name":`${name}`,"patronymic":`${patronymic}`,"gender":`${gender}`,"source":null,"qc":"0"}}]
    }
  }
  cy.intercept('POST', 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/fio', staticResponse).as('request')
  cy.wait('@request', {timeout: 30000}).then((xhr) => {
    const response = xhr.response.body.suggestions[0].data.gender;
    expect(response).to.eq(`${gender}`)
  })
  cy.get('input[name="birthday"]').type(birthday)
  cy.get('input[placeholder="email@domain.ru"]').type(email)
  cy.get(`input[value="${genderValue}"]`).should('be.checked')
  cy.get('div[data-step="3"] button[data-context="next"]').click()
})

Cypress.Commands.add('step_3_passport_details', (passportSeriaNumber, passportIssueByCode, passportIssueDate, passportIssuePlace) => {
  cy.check_step_header('3')
  cy.get('input[name="passportSeriaNumber"]').type(passportSeriaNumber)
  cy.get('input[name="passportIssueByCode"]').type(passportIssueByCode)
  cy.get('input[name="passportIssueDate"]').type(passportIssueDate)
  cy.get('textarea[name="passportIssuePlace"]').type(passportIssuePlace)
  cy.get('div[data-step="4"] button[data-context="next"]').click()
})

Cypress.Commands.add('step_4_permanent_address', (birthPlace, permanentAddress) => {
  cy.check_step_header('4')
  cy.get('textarea[name="birthPlace"]').type(`${birthPlace}{enter}`)
  cy.get('textarea[name="permanentAddress"]').type(`${permanentAddress}{enter}`)
  cy.get('span').contains('Только РФ').click()
  cy.get('div[data-step="5"] button[data-context="next"]').click()
})

Cypress.Commands.add('step_5_delivery_details', (deliveryAddress) => {
  cy.check_step_header('5')
  cy.get('textarea[name="deliveryAddress"]').type(`${deliveryAddress}{enter}`)
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
  cy.get('span').contains('Бесплатная доставка').click()
  cy.get('div[data-step="6"] button[data-context="next"]').should('be.enabled').click()
  cy.wait('@request', {timeout: 30000}).its('request.body.auth').then((auth) => {
      expect(auth.phone).to.equal("71111111111")
      expect(auth.token).to.equal("YD5j3gq0eyQI8xJQ/Dpx7Cas")
  })
})

Cypress.Commands.add('check_result', (text) => {
  cy.get('div[class="ccform-thx-page__row ccform-thx-page__row--last"] div[class="ccform-thx-page__title"]').contains(text).should('be.visible')
})

/* Cypress.Commands.add('click_next', () => {
  cy.get('button[data-context="next"]').contains('Далее').click({force: true})
}) */