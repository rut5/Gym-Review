import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { createGym } from '../services/api'

export default function AddGym() {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect } = useAuth0()

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect()
    }
  }, [isLoading, isAuthenticated, loginWithRedirect])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const token = await getAccessTokenSilently()
      const gym = await createGym({ name, location, description }, token)
      navigate(`/gyms/${gym.id}`)
    } catch {
      setError('Failed to create gym. Please try again.')
      setSubmitting(false)
    }
  }

  if (isLoading || !isAuthenticated) {
    return <div className="status">Redirecting to login...</div>
  }

  return (
    <div className="page page-narrow">
      <button className="btn-back" onClick={() => navigate('/')}>← Back to gyms</button>
      <h1>Add a Gym</h1>
      <form onSubmit={handleSubmit} className="gym-form">
        <div className="form-group">
          <label htmlFor="name">Gym Name *</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Iron House Gym"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="e.g. Malmö"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Tell people what makes this gym special..."
            rows={4}
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={() => navigate('/')}>
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting || !name || !location}
          >
            {submitting ? 'Adding...' : 'Add Gym'}
          </button>
        </div>
      </form>
    </div>
  )
}
