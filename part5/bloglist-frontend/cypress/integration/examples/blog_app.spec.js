describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    // user 2
    const user2 = {
      name: 'Marcus Aurelius',
      username: 'root2',
      password: 'sekret2'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    // cy.visit('http://localhost:3000')
    cy.contains('blogs')
    // cy.contains('How to win every time')
  })

  it('login form is open', function() {
    cy.get('#login-form')
  })


  it('user can log in', function() {
    // cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('sekret')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged in')
  })

  it('wrong user Cannot login', function() {
    // cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('papa')
    cy.get('#login-button').click()

    cy.contains('Wrong credentials')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // cy.get('#username').type('root')
      // cy.get('#password').type('sekret')
      // cy.get('#login-button').click()
      cy.login({ username: 'root', password: 'sekret' })
      cy.contains('Matti Luukkainen logged in')
      // cy.createBlog({ title: 'first blog', author: 'Pepe', url: 'www.koko.com', likes: 0 })
    })

    it('a new blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('a Blog created by cypress with autologin')
      cy.get('#author').type('pepe romez')
      cy.get('#url').type('www.url.com')
      cy.contains('save').click()
      cy.contains('a Blog created by cypress with autologin')
    })
    it('A blog can be created with function', function() {
      cy.createBlog({ title: 'Second blog', author: 'Pepe Gomez2', url: 'www.koko.com', likes: 0 })
      cy.contains('Second blog')
      // cy.contains('New Blog').parent().find('button').as('theButton')
      // cy.get('@theButton').click()

      // cy.get('New Blog').click()
    })
  })

  describe('test on one note', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'sekret' })
      cy.createBlog({
        title: 'another blog cypress3',
        author: 'Pepe Gomez',
        url: 'www.kiko.com',
        likes: 0
      })
    })

    it('validate can liked', function () {

      // cy.get('another blog cypress3')
      //   .contains('Show').click()
      cy.contains('another blog cypress3').parent().find('#show').as('theButton')
      cy.get('@theButton').click()
      cy.contains('likes: 0')

      cy.contains('another blog cypress3').parent().find('#likes').as('theLikesButton')
      cy.get('@theLikesButton').click()
      cy.contains('likes: 1')

      // cy.get('@theButton').should('contain', 'make not important')
    })

    it('validate can be deleted hy authorized user', function () {

      // cy.get('another blog cypress3')
      //   .contains('Show').click()
      cy.contains('another blog cypress3').parent().find('#show').as('theButton')
      cy.get('@theButton').click()
      cy.contains('likes: 0')
      cy.contains('another blog cypress3').should('exist')

      cy.contains('another blog cypress3').parent().find('#delete').as('theDelButton')
      cy.get('@theDelButton').click()
      cy.get('another blog cypress3').should('not.exist')
      // cy.contains('another blog cypress3')
      // cy.notcontains('likes: 1')

      // cy.get('@theButton').should('contain', 'make not important')
    })
    it('cannot delete blog by other user', function () {

      cy.get('#log-out').click()
      cy.login({ username: 'root2', password: 'sekret2' })

      // cy.get('another blog cypress3')
      //   .contains('Show').click()
      cy.contains('another blog cypress3').parent().find('#show').as('theButton')
      cy.get('@theButton').click()
      cy.contains('likes: 0')
      cy.contains('another blog cypress3').should('exist')

      cy.contains('another blog cypress3').parent().find('#delete').should('not.exist')

    })

  })

  describe.only('blogs in correct order', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'sekret' })
      cy.createBlog({
        title: 'another blog cypress3',
        author: 'Pepe Gomez',
        url: 'www.kiko.com',
        likes: 1
      })
      cy.createBlog({
        title: 'another blog Min2',
        author: 'Pepe Gomez',
        url: 'www.kiko.com',
        likes: 5
      })
      cy.createBlog({
        title: 'another blog medium',
        author: 'Pepe Gomez',
        url: 'www.kiko.com',
        likes: 2
      })


    })

    it('validate blogs are ordered', function () {
      cy.request('GET', 'http://localhost:3003/api/blogs')
      .then(response => {
        console.log("cypress retrieve:",response.body)
        var blogs_ret = response.body

        blogs_ret.sort((a, b) => (b.likes > a.likes) ? 1 : -1)

        cy.get('.blogNonDefault').each(($el, index, $list) => {
          let tagDiv = $list.get(index).innerText
          let dbLikes = 'likes: ' + blogs_ret[index].likes
          // expect(tagDiv).to.include(dbLikes)
          expect(tagDiv).to.include(blogs_ret[index].title)
        })
      })
    })


  })

})
