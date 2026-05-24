import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getGyms } from '../services/api'
import type { Gym } from '../types'

function avgRating(gym: Gym): string | null {
  if (!gym.reviews.length) return null
  const sum = gym.reviews.reduce((acc, r) => acc + r.rating, 0)
  return (sum / gym.reviews.length).toFixed(1)
}

export default function Browse() {
  const [gyms, setGyms] = useState<Gym[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getGyms()
      .then(setGyms)
      .catch(() => setError('Failed to load gyms. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="status">Loading gyms...</div>
  if (error) return <div className="status error">{error}</div>

  return (
    <div className="browse-page">
      <div className="hero-section">
        <h1 className="browse-title">Find The Gym For You</h1>
        <p className="browse-subtitle">Discover and review gyms in your area</p>
      </div>

      {gyms.length === 0 ? (
        <div className="status">No gyms yet - log in and add the first one!</div>
      ) : (
        <div className="gym-grid">
          {gyms.map(gym => {
            const avg = avgRating(gym)
            return (
              <Link to={`/gyms/${gym.id}`} key={gym.id} className="gym-card">
                <div className="gym-card-img-wrap">
                  {gym.imageUrl ? (
                    <img src={gym.imageUrl} alt={gym.name} className="gym-card-img" />
                  ) : (
                    <div className="gym-card-img-placeholder">
                      {gym.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="gym-card-content">
                  <h2 className="gym-card-name">{gym.name}</h2>
                  <p className="gym-card-location">📍 {gym.location}</p>
                  {gym.description && (
                    <p className="gym-card-desc">{gym.description}</p>
                  )}
                  <div className="gym-card-footer">
                    {avg ? (
                      <span className="rating">⭐ {avg}</span>
                    ) : (
                      <span className="no-reviews">No reviews yet</span>
                    )}
                    <span className="review-count">
                      {gym.reviews.length} {gym.reviews.length === 1 ? 'review' : 'reviews'}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
