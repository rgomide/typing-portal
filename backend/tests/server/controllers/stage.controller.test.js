const request = require('supertest')
const app = require('@server/app')
const { createToken, createUser } = require('@tests/utils/authUtils')
const { create } = require('@server/services/stage.service')
const {
  ROLES: { ADMIN, MANAGER, GUEST }
} = require('@server/config/constants')

describe('Stage Controller', () => {
  describe('GET /api/stage', () => {
    it('should return a list of stages', async () => {
      const user = await createUser(ADMIN)
      const token = createToken(user.id)

      await create({
        title: 'Stage 1',
        description: 'Description 1',
        difficulty: 1,
        enabled: true,
        thumbUrl: 'https://example.com/thumb1.jpg',
        textChallenge: 'Text Challenge 1'
      })

      await create({
        title: 'Stage 2',
        description: 'Description 2',
        difficulty: 2,
        enabled: true,
        thumbUrl: 'https://example.com/thumb2.jpg',
        textChallenge: 'Text Challenge 2'
      })
      const response = await request(app).get('/api/stages').set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200)

      expect(response.body).toEqual([
        expect.objectContaining({
          id: expect.any(String),
          title: 'Stage 1',
          description: 'Description 1',
          difficulty: 1,
          enabled: true,
          thumbUrl: 'https://example.com/thumb1.jpg',
          textChallenge: 'Text Challenge 1'
        }),
        expect.objectContaining({
          id: expect.any(String),
          title: 'Stage 2',
          description: 'Description 2',
          difficulty: 2,
          enabled: true,
          thumbUrl: 'https://example.com/thumb2.jpg',
          textChallenge: 'Text Challenge 2'
        })
      ])
    })

    it('return 403 if user is not authorized', async () => {
      const response = await request(app).get('/api/stages')
      expect(response.status).toBe(403)
      expect(response.body.message).toBe('Acesso negado')
    })
  })

  describe('GET /api/stages/:stageId', () => {
    it('should return a stage by id', async () => {
      const user = await createUser(ADMIN)
      const token = createToken(user.id)

      const stage = await create({
        title: 'Stage 1',
        description: 'Description 1',
        difficulty: 1,
        enabled: true,
        thumbUrl: 'https://example.com/thumb1.jpg',
        textChallenge: 'Text Challenge 1'
      })

      const response = await request(app)
        .get(`/api/stages/${stage.id}`)
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body).toEqual(expect.objectContaining({ id: stage.id }))
    })
  })

  it('return 404 if stage is not found', async () => {
    const user = await createUser(ADMIN)
    const token = createToken(user.id)

    const response = await request(app)
      .get('/api/stages/999999')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Stage not found')
  })
})
