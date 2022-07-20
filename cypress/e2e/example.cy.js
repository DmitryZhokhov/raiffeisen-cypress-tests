describe('raiffeisenTestFormPositive(desktop)', () => {
  beforeEach(() => {
    cy.viewport(1440, 720)
    cy.visit('https://www.raiffeisen.ru/')
  })
  it('positivetestform', {
    defaultCommandTimeout: 50000
  },() => {
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
    cy.phonenumber_validation_step("+7 (111) 111-11-11", "1111") 
    cy.сontactdetails_validation_step('Ярошук Виктор Михайлович', '01.01.2002', 'Vilala593@gmail.com', 'Мужской')
    cy.passport_details_step('1111-111111','123-456','01.01.2022','01.01.2022')
    cy.place_of_birth('г Москва, ул Липецкая, д 10 к 1, кв 30', 'г Москва')
    cy.shipping_adress_step('г Москва, ул Липецкая, д 10 к 1, кв 1')
    cy.get('div').contains('Заявка передана в службу доставки').should('be.visible')
  })
})

describe('raiffeisenTestFormNegative(desktop)', () => {
  beforeEach(() => {
    cy.viewport(1440, 720)
    cy.visit('https://www.raiffeisen.ru/')
  })
  it('invalidContactDetails(fio)', {
    defaultCommandTimeout: 50000
  },() => {
    cy.phonenumber_validation_step("+7 (111) 111-11-11", "1111") 
    cy.сontactdetails_validation_step('hello', '01.01.2002', 'Vilala593@gmail.com', 'Мужской')
    cy.get('div').contains('Введите фамилию, имя и отчество через пробел').should('be.visible')
  })
})


