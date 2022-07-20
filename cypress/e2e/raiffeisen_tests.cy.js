describe('Raiffeisen Tests', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('https://www.raiffeisen.ru/')
  })
    it('Test order debit card', () => {
    cy.step_1('+7(111)111-11-11', '1111')
    cy.step_2('Иванов Дмитрий Михайлович', '16.11.1986', 'test@gmail.com')
    cy.step_3('0505-000000','123-456','01.01.2020','1 УВД города Москвы')
    cy.step_4('г. Москва', 'г Москва, ул Октябрьская, д 2, кв 22')
    cy.step_5('г Москва, ул Октябрьская, д 2, кв 22')
    cy.check_result('Заявка передана в службу доставки')
    })
})