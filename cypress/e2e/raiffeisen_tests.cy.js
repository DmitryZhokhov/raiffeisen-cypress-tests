describe('Raiffeisen Tests', () => {

  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('/')
  })

    it('Order debit card by Male', () => {
      cy.check_step_header('1')
      cy.step_1_phone_validation('+7(111)111-11-11', '1111')
      cy.check_step_header('2')
      cy.step_2_contact_details('Иванов', 'Дмитрий', 'Михайлович', 'MALE', 'M', '16.11.1986', 'test@gmail.com')
      cy.check_step_header('3')
      cy.step_3_passport_details('0505-000000','123-456','01.01.2020','1 УВД города Москвы')
      cy.check_step_header('4')
      cy.step_4_permanent_address('г. Москва', 'г Москва, ул Октябрьская, д 2, кв 22')
      cy.check_step_header('5')
      cy.step_5_delivery_details('г Москва, ул Октябрьская, д 2, кв 22')
      cy.check_result('Заявка передана в службу доставки')
    })

    it('Order debit card by Female', () => {
      cy.check_step_header('1')
      cy.step_1_phone_validation('+7(111)111-11-11', '1111')
      cy.check_step_header('2')
      cy.step_2_contact_details('Петрова', 'Елена', 'Александровна', 'FEMALE', 'F', '16.11.1986', 'test@gmail.com')
      cy.check_step_header('3')
      cy.step_3_passport_details('0505-000000','123-456','01.01.2020','1 УВД города Москвы')
      cy.check_step_header('4')
      cy.step_4_permanent_address('г. Москва', 'г Москва, ул Октябрьская, д 2, кв 22')
      cy.check_step_header('5')
      cy.step_5_delivery_details('г Москва, ул Октябрьская, д 2, кв 22')
      cy.check_result('Заявка передана в службу доставки')
    })
})