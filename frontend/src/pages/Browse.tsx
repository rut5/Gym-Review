import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getGyms } from '../services/api'
import type { Gym } from '../types'

const CITIES = [
  'Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Upplands Väsby', 'Sollentuna',
  'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping',
  'Lund', 'Umeå', 'Gävle', 'Borås', 'Södertälje', 'Eskilstuna', 'Halmstad',
  'Växjö', 'Karlstad', 'Sundsvall', 'Östersund', 'Trollhättan', 'Luleå',
  'Lidingö', 'Borlänge', 'Tumba', 'Kristianstad', 'Kalmar', 'Skövde', 'Falkenberg',
]

function avgRating(gym: Gym): string | null {
  if (!gym.reviews.length) return null
  const sum = gym.reviews.reduce((acc, r) => acc + r.rating, 0)
  return (sum / gym.reviews.length).toFixed(1)
}

function gymMatchesCity(gym: Gym, city: string): boolean {
  return gym.location.toLowerCase().includes(city.toLowerCase())
}

async function reverseGeocodeCity(lat: number, lng: number): Promise<string | null> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
    { headers: { 'Accept-Language': 'sv' } }
  )
  const data = await res.json()
  const name: string =
    data.address?.city ||
    data.address?.town ||
    data.address?.municipality ||
    ''
  if (!name) return null
  const nameLower = name.toLowerCase()
  return (
    CITIES.find(c =>
      nameLower.includes(c.toLowerCase()) || c.toLowerCase().includes(nameLower)
    ) ?? null
  )
}

export default function Browse() {
  const [gyms, setGyms] = useState<Gym[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState('')
  const [locLoading, setLocLoading] = useState(false)
  const [locError, setLocError] = useState<string | null>(null)

  useEffect(() => {
    getGyms()
      .then(setGyms)
      .catch(() => setError('Failed to load gyms'))
      .finally(() => setLoading(false))
  }, [])

  function handleNearMe() {
    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported by your browser.')
      return
    }
    setLocLoading(true)
    setLocError(null)
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const city = await reverseGeocodeCity(coords.latitude, coords.longitude)
          if (city) {
            setSelectedCity(city)
          } else {
            setLocError('Could not find a matching city near your location')
          }
        } catch {
          setLocError('Failed to detect your city')
        } finally {
          setLocLoading(false)
        }
      },
      () => {
        setLocError('Location access denied')
        setLocLoading(false)
      }
    )
  }

  const filteredGyms = selectedCity
    ? gyms.filter(gym => gymMatchesCity(gym, selectedCity))
    : gyms

  return (
    <div className="browse-page">
      <div className="hero-section">
        <h1 className="browse-title">Find The Gym For You</h1>
        <p className="browse-subtitle">Discover and review gyms in your area</p>

        <div className="hero-filter-bar">
          <select
            className="city-select"
            value={selectedCity}
            onChange={e => { setSelectedCity(e.target.value); setLocError(null) }}
          >
            <option value="">All cities</option>
            {CITIES.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <button
            className="btn-near-me"
            onClick={handleNearMe}
            disabled={locLoading}
          >
            {locLoading ? 'Locating...' : '📍 Show gyms near me'}
          </button>
        </div>

        {locError && <p className="loc-error">{locError}</p>}
      </div>

      {loading ? (
        <div className="status">Loading gyms...</div>
      ) : error ? (
        <div className="status error">{error}</div>
      ) : selectedCity && filteredGyms.length === 0 ? (
        <div className="status">
          There are no registered gyms in this city on Gym Review
        </div>
      ) : !selectedCity && gyms.length === 0 ? (
        <div className="status">No gyms yet - log in and add the first one!</div>
      ) : (
        <div className="gym-grid">
          {filteredGyms.map(gym => {
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
