import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../../src/app'

describe('CORS headers', () => {
  it('returns Access-Control-Allow-Origin for the configured client origin', async () => {
    const res = await request(app)
      .get('/gyms')
      .set('Origin', 'http://localhost:5173')

    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:5173')
  })

  it('handles preflight OPTIONS request with correct CORS headers', async () => {
    const res = await request(app)
      .options('/gyms')
      .set('Origin', 'http://localhost:5173')
      .set('Access-Control-Request-Method', 'POST')
      .set('Access-Control-Request-Headers', 'Content-Type, Authorization')

    expect(res.status).toBe(204)
    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:5173')
    expect(res.headers['access-control-allow-headers']).toMatch(/authorization/i)
  })
})
