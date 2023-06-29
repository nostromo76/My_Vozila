const { beforeEach } = require("mocha")

describe('template spec', () => {
  beforeEach('Open page', () => {
    cy.visit('../../Vozila.html')
  })
  it('Provera stranice ', function () {


    // Da li je to dobra stranica
    cy.title().should('exist', 'Vozila.html');

    // Provera  natpisa u h5
    cy.get('h5').should('have.text', 'Lista Vozila na parkingu');
  })
  it('Testiranje input polja', function () {

    cy.get('#vlasnik').type('Pera Peric')
    cy.get('#auto').type('Toyota')
    cy.get('#godiste').type('2018')
    cy.get('#kilometraza').type('5000')
    cy.get('#DatumUlaska').type('2023-07-01')
    cy.get('#DatumIzlaska').type('2023-07-08')
    cy.get('#submit').click()
    cy.get('input')
      .filter((index, el) => el.value === '') // Ako je neko polje prazno
      .its('length')
      .then((count) => {
        if (count > 0) {
          cy.get('#greska')
            .scrollIntoView()
            .should('be.visible')
            .and('have.text', 'Sva polja moraju biti popunjena!')
        }

        cy.get('#tablice').type('12-AAA-CC').should('have.value', '12-AAA-CC')
        cy.get('#submit').click()
        cy.get('#tablice')
          .filter((index, element) => {
            const value = element.value
            const pattern = /^\w{2}-\d{3,4}-\w{1,2}$/ // regex XX-123-YY or AA-1234-BB
            return !pattern.test(value) //vraca true ako nije regex
          })
        cy.get('#greska')
          .should('have.text', 'Tablice moraju biti u formatu XX-123-YY ili AA-1234-BB')
      })
  })
  it('Testiranje outputa, update i delete buttons ', function () {
    cy.get('#tableHead > tr > :nth-child(1)').should('have.text', 'Vlasnik')
    cy.get('#tableHead > tr > :nth-child(2)').should('have.text', 'Auto')
    cy.get('#tableHead > tr > :nth-child(3)').should('have.text', 'tablice')
    cy.get('#tableHead > tr > :nth-child(4)').should('have.text', 'Datum ulaska')
    cy.get('#tableHead > tr > :nth-child(5)').should('have.text', 'Datum izlaska')
    cy.get('#tableHead > tr > :nth-child(6)').should('have.text', 'Kategorija')
    cy.get('.actions').should('have.text', 'Actions')

    cy.get('#vlasnik').type('Pera Peric')
    cy.get('#auto').type('Toyota')
    cy.get('#tablice').type('BG-1234-XY')
    cy.get('#godiste').type('2018')
    cy.get('#kilometraza').type('5000')
    cy.get('#DatumUlaska').type('2023-07-01')
    cy.get('#DatumIzlaska').type('2023-07-08')
    cy.get('#submit').click()

    cy.get('[onclick="parking.izmeniKorisnika(0)"]').should('have.text', 'Izmeni')
    cy.get('[onclick="parking.izbrisiKorisnika(0)"]').should('have.text', 'Izbriši')
    cy.get('#rezultat > tr > :nth-child(1)').should('have.text', 'Pera Peric')
    cy.get('#rezultat > tr > :nth-child(2)').should('have.text', 'Toyota')
    cy.get('#rezultat > tr > :nth-child(3)').should('have.text', 'BG-1234-XY')
    cy.get('#rezultat > tr > :nth-child(4)').should('have.text', '2023-07-01')
    cy.get('#rezultat > tr > :nth-child(5)').should('have.text', '2023-07-08')
    cy.get('#rezultat > tr > :nth-child(6)').should('have.text', 'Star')
    //provera Izmeni
    cy.get('[onclick="parking.izmeniKorisnika(0)"]').click()

    cy.get('#auto').should('have.value', 'Toyota')
    cy.get('#vlasnik').invoke('val').should('equal', 'Pera Peric')

    // promena polja 
    cy.get('#vlasnik').clear().type('Zika Pavlovic')
    cy.get('#auto').clear().type('Yugo')

    cy.get('#submit').click()

    // provera izmene 
    cy.get('#rezultat > tr > :nth-child(1)').should('contain', 'Zika Pavlovic')
    cy.get('#rezultat > tr > :nth-child(2)').should('contain', 'Yugo')


    //provera delete

    cy.get('[onclick="parking.izbrisiKorisnika(0)"]').click()
    cy.get('#rezultat')
      .should('exist')
      .and('not.contain', 'Zika Pavlovic')
      .and('not.contain', 'Yugo')

  })

    it('Testiranje  div boxova i texta',function(){
      cy.get('h3').should('have.text','Kategorije')
      cy.get(':nth-child(4) > .container > h4').should('contain',' invaliditetom')
      cy.get(':nth-child(4) > .container > p').should('contain','Hvala sto postujete dogovor')
      cy.get(':nth-child(5) > .container > h4').should('have.text','Pravila i obaveze')
      cy.get(':nth-child(5) > .container > p').should('contain','sa zakonom o saobracajnim propisima')

    })
   
})