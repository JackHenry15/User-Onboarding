describe('User app', () => {
    beforeEach(() => {
        cy.visit(`http://localhost:3000`)
    })

const nameInput = () => cy.get('input[name=name]')
const emailInput = () => cy.get('input[name=email]')
const passwordInput = () => cy.get('input[name=password]')
const tosInput = () => cy.get('input[name=tos]')
const submitButton = () => cy.get('button')

    describe('Filling out inputs', () => {


        //tests

        //get name input and type a name in it
        it('get name input and type a name in it', () =>{
            nameInput()
            .should('have.value', '')
            .type('Jeff')
        //use an assertion to check if the text input contains the name provided (.should())
            .should('have.value', 'Jeff')
        })
        //get the email input and type an email address in it
        it('get the email input and type an email address in it', () => {
            emailInput()
            .should('have.value', '')
            .type('jeff@jeff.com')
        })
        //get the password input and type a password in it
        it('get the password input and type a password in it', () => {
            passwordInput()
            .should('have.value', '')
            .type('verysecretpassword')
        })
        //set up a test that will check to see if a user can check the tos box
        it('set up a test that will check to see if a user can check the tos box', () => {
            tosInput()
            .should('exist')
            .check()
        })
        // check to see if a user can submit the form data
        it('check to see if a user can submit the form data', () => {
            nameInput().type('Jeff')
            emailInput().type('jeff@jeff.com')
            passwordInput().type('verysecretpassword')
            tosInput().check()
            submitButton().click()
        })
        // check for form validation if an input is left empty
        it('check for form validation if an input is left empty', () => {

            cy.get('form').within(() => {
            nameInput().should('not.have.value', '')
            emailInput().should('not.have.value', '')
            passwordInput().should('not.have.value', '')
            tosInput().should('be.checked')
            })
        })
    })
})