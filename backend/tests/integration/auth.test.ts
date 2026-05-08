import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../../src/app.ts'

describe('Auth middleware — /profile', () => {
  it('returns 401 on GET without a token', async () => {
    const res = await request(app).get('/profile')
    expect(res.status).toBe(401)
  })

  it('returns 401 on POST without a token', async () => {
    const res = await request(app).post('/profile').send({ name: 'test' })
    expect(res.status).toBe(401)
  })

  it('returns 401 on GET with a malformed token', async () => {
    const res = await request(app)
      .get('/profile')
      .set('Authorization', 'Bearer not-a-real-jwt')
    expect(res.status).toBe(401)
  })
})
