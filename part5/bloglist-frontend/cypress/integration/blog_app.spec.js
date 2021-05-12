describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Silvio',
      username: 'silva',
      password: '123',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is show', function () {
    cy.get('h2').should('contain', 'log in')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('silva')
      cy.get('#password').type('123')
      cy.get('#login-button').click()

      cy.contains('Silvio is logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('silva')
      cy.get('#password').type('12345')
      cy.get('#login-button').click()

      cy.contains('Wrong Credentials')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('silva')
      cy.get('#password').type('123')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('Add').click()
      cy.get('#title').type('Canonical string reduction')
      cy.get('#author').type('Edsger W. Dijkstra')
      cy.get('#url').type(
        'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
      )
      cy.get('#createBlogButton').click()

      cy.contains('Canonical string reduction Edsger W. Dijkstr')
    })

    describe('when a blog exists', function () {
      beforeEach(function () {
        cy.contains('Add').click()
        cy.get('#title').type('Canonical string reduction')
        cy.get('#author').type('Edsger W. Dijkstra')
        cy.get('#url').type(
          'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
        )
        cy.get('#createBlogButton').click()
      })

      it('checks that user can like a blog', function () {
        cy.get('#visibilityButton').click()
        cy.contains('likes 0')
        cy.get('#likeButton').click()
        cy.contains('likes 1')
      })

      it('ensures that the user who created a blog can delete it,', function () {
        cy.get('#visibilityButton').click()
        cy.get('#deleteButton').click()
        cy.should('not.contain', 'Canonical string reduction Edsger W. Dijkstr')
      })

      describe('when multiple blogs exists', function() {
        beforeEach(function () {
          cy.contains('Add').click()
          cy.get('#title').type('HSHSHSHAWQQ')
          cy.get('#author').type('Edsger W. Dijkstra')
          cy.get('#url').type(
            'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
          )
          cy.get('#createBlogButton').click()
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(2000)
          cy.contains('Add').click()
          cy.get('#title').type('ExtremeProgramming')
          cy.get('#author').type('Martin Fowler')
          cy.get('#url').type(
            'https://martinfowler.com/bliki/ExtremeProgramming.html'
          )
          cy.get('#createBlogButton').click()
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(2000)
        })

        it('checks that the blogs are ordered according to likes with the blog with the most likes being first', function () {
          cy.get('[data-cy=viewHideButton]').click({ multiple: true })
          cy.get('[data-cy=likeBtn').eq(2).click()
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(2000)
          cy.get('[data-cy=likeBtn').eq(0).click()
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(2000)
          cy.get('[data-cy=likeBtn').eq(1).click()
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(2000)
          cy.get('[data-cy=like]').then(($span) => {
            const t = [...$span.text()]
            expect(t).to.deep.eq(['2', '1', '0'])
          })
        })
      })
    })
  })
})
