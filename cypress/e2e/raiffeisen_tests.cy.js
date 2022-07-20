describe('Raiffeisen Tests', () => {
  beforeEach(() => {
    cy.viewport(1440, 720)
    cy.visit('https://www.raiffeisen.ru/')
  })
    it('Test order debit card', () => {
    cy.get('input[name="mobilePhone"]').type('+71111111111')
    cy.get('div[data-step="1"] button[data-context="next"]').click()
    cy.get('input[name="mobilePhoneConfirmation"]').type('1111')
    cy.get('textarea[name="name"]').type('Жохов Дмитрий Михайлович')
    cy.get('input[name="birthday"]').type('16.11.1986')
    cy.get('input[placeholder="email@domain.ru"]').type('test@gmail.com')
    cy.get('span').contains('Мужской').click()
    cy.get('div[data-step="3"] button[data-context="next"]').click()
    cy.get('input[name="passportSeriaNumber"]').type('0505000000')
    cy.get('input[name="passportIssueByCode"]').type('101101')
    cy.get('input[name="passportIssueDate"]').type('10.01.2015')
    cy.get('textarea[name="passportIssuePlace"]').type('1 УВД города Москвы')
    cy.get('div[data-step="4"] button[data-context="next"]').click()
    cy.get('textarea[name="permanentAddress"]').type('г Москва, ул Октябрьская, д 2, кв 22')
    cy.get('textarea[name="birthPlace"]').type('г. Москва')
    cy.get('div[data-step="5"] button[data-context="next"]').click()
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
  })
    cy.get('textarea[name="deliveryAddress"]').type('г Москва, ул Октябрьская, д 2, кв 22')
    cy.get('div[data-step="6"] button[data-context="next"]').click()
    })
})