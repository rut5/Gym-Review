import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import api, { authHeader } from '../services/api'

export default function Profile() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isAuthenticated) return

    getAccessTokenSilently()
      .then(token => api.get('/profile', authHeader(token)))
      .then(res => setProfile(res.data))
      .catch(err => setError(err.message))
  }, [isAuthenticated, getAccessTokenSilently])

  if (isLoading) return <p>Loading...</p>
  if (!isAuthenticated) return <p>Please log in to view your profile.</p>
  if (error) return <p>Error: {error}</p>
  if (!profile) return <p>Loading profile...</p>

  return (
    <div>
      <h2>Profile</h2>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  )
}
