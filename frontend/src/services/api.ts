import axios from 'axios'
import type { Gym, Review } from '../types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:4000',
  withCredentials: true,
})

export const getGyms = () =>
  api.get<Gym[]>('/gyms').then(r => r.data)

export const getGym = (id: number) =>
  api.get<Gym>(`/gyms/${id}`).then(r => r.data)

export const createGym = (data: Omit<Gym, 'id' | 'reviews'>, token: string) =>
  api
    .post<Gym>('/gyms', data, { headers: { Authorization: `Bearer ${token}` } })
    .then(r => r.data)

export const createReview = (
  gymId: number,
  data: Omit<Review, 'id'>,
  token: string,
) =>
  api
    .post<Review>(`/gyms/${gymId}/reviews`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(r => r.data)
