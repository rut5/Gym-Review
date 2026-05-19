export interface Review {
  id: number
  author: string
  rating: number
  comment?: string
}

export interface Gym {
  id: number
  name: string
  location: string
  description?: string
  imageUrl?: string
  reviews: Review[]
}
