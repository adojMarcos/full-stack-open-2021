describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Silvio',
      username: 'silva',
      password: '123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')

  })

  it('login form is show', function() {
    cy.get('h2').should('contain', 'log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('silva')
      cy.get('#password').type('123')
      cy.get('#login-button').click()

      cy.contains('Silvio is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('silva')
      cy.get('#password').type('12345')
      cy.get('#login-button').click()

      cy.contains('Wrong Credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('silva')
      cy.get('#password').type('123')
      cy.get('#login-button').click()

      cy.contains('Add').click()
      cy.get('#title').type('Canonical string reduction')
      cy.get('#author').type('Edsger W. Dijkstra')
      cy.get('#url').type('http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
      cy.get('#createBlogButton').click()
    })

    it('A blog can be created', function() {
      cy.contains('Canonical string reduction Edsger W. Dijkstr')
    })

    it('checks that user can like a blog', function() {
      cy.get('#visibilityButton').click()

      cy.contains('likes 0')

      cy.get('#likeButton').click()

      cy.contains('likes 1')
    })
  })
})