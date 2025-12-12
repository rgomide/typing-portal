const request = require('supertest')
const app = require('@server/app')
const { createToken, createUser } = require('@tests/utils/authUtils')
const {
  ROLES: { ADMIN, MANAGER, GUEST }
} = require('@server/config/constants')

describe('User Controller', () => {
  describe('GET /api/users', () => {
    it('should return a list of users', async () => {
      const user01 = await createUser(ADMIN)
      const user02 = await createUser(GUEST)

      const token = createToken(user01.id)
      const response = await request(app).get('/api/users').set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(response.body).toEqual([
        expect.objectContaining({
          id: expect.any(String),
          firstName: user01.firstName,
          lastName: user01.lastName,
          userName: user01.userName,
          email: user01.email,
          isAdmin: true,
          isManager: false
        }),
        expect.objectContaining({
          id: expect.any(String),
          firstName: user02.firstName,
          lastName: user02.lastName,
          userName: user02.userName,
          email: user02.email,
          isAdmin: false,
          isManager: false
        })
      ])
    })

    it('return 403 if user is not authorized', async () => {
      const response = await request(app).get('/api/users')
      expect(response.status).toBe(403)
      expect(response.body.message).toBe('Acesso negado')
    })
  })

  describe('GET /api/users/:userId', () => {
    it('should return a user by id', async () => {
      const user = await createUser(ADMIN)
      const token = createToken(user.id)

      const response = await request(app)
        .get(`/api/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        id: expect.any(String),
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        isAdmin: true,
        isManager: false,
        email: user.email,
        roles: ['admin'],
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      })
    })

    it('return 404 if user is not found', async () => {
      const user = await createUser(ADMIN)
      const token = createToken(user.id)

      const response = await request(app)
        .get(`/api/users/${user.id + 555}`)
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(404)
      expect(response.body.message).toBe('User not found')
    })

    it('return 403 if user is not authorized', async () => {
      const response = await request(app).get('/api/users/1')
      expect(response.status).toBe(403)
      expect(response.body.message).toBe('Acesso negado')
    })
  })

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const user = await createUser(ADMIN)
      const token = createToken(user.id)

      const response = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          userName: 'denecley',
          firstName: 'Denecley',
          lastName: 'Alvim',
          email: 'newemail@gmail.com',
          password: '111'
        })

      expect(response.status).toBe(201)
      expect(response.body).toEqual({
        id: expect.any(String),
        firstName: 'Denecley',
        lastName: 'Alvim',
        userName: 'denecley',
        email: 'newemail@gmail.com',
        isAdmin: false,
        isManager: false,
        roles: [],
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      })
    })

    it('should return a 400 if user already exists', async () => {
      const user = await createUser(ADMIN)
      const token = createToken(user.id)

      const response = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: '111'
        })

      expect(response.status).toBe(400)
      expect(response.body.message).toBe('Usuário já existe')
    })
  })

  describe('PUT /api/users/:userId', () => {
    it('should update a user', async () => {
      const user = await createUser(ADMIN)
      const token = createToken(user.id)

      const response = await request(app)
        .put(`/api/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          userName: 'admin',
          email: 'denecley@gmail.com',
          firstName: 'Gosta',
          lastName: 'Filho'
        })

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        id: expect.any(String),
        firstName: 'Gosta',
        lastName: 'Filho',
        userName: 'admin',
        email: 'denecley@gmail.com',
        isAdmin: false,
        isManager: false,
        roles: [],
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      })
    })

    it('should return a 403 if user is not authorized', async () => {
      const response = await request(app).put('/api/users/1')
      expect(response.status).toBe(403)
      expect(response.body.message).toBe('Acesso negado')
    })

    it('should return a 403 if user is manager and is not authorized to update the user', async () => {
      const user = await createUser(MANAGER)
      const otherUser = await createUser(GUEST)

      const token = createToken(user.id)

      const response = await request(app)
        .put(`/api/users/${otherUser.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          userName: 'john',
          firstName: 'Gosta',
          lastName: 'Filho',
          email: 'john@gmail.com',
          password: '111'
        })

      expect(response.status).toBe(403)
      expect(response.body.message).toBe('Usuário não tem permissão para atualizar este usuário')
    })
  })

  describe('DELETE /api/users/:userId', () => {
    it('should delete a user', async () => {
      const user = await createUser(ADMIN)
      const otherUser = await createUser(GUEST)

      const token = createToken(user.id)

      const response = await request(app)
        .delete(`/api/users/${otherUser.id}`)
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(204)
    })

    it('should return a 403 if user is not authorized', async () => {
      const response = await request(app).delete('/api/users/1')
      expect(response.status).toBe(403)
      expect(response.body.message).toBe('Acesso negado')
    })

    it('should return a 403 if user is admin and try to delete himself', async () => {
      const user = await createUser(ADMIN)
      const token = createToken(user.id)

      const response = await request(app)
        .delete(`/api/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(403)
      expect(response.body.message).toBe('Usuário não pode se deletar')
    })
  })
})
