import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'

export default function Signup({ history }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    if (user) {
      history.push('/')
    }
  }, [user, history])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        'http://localhost:1337/auth/local/register',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            username,
            email,
            password
          })
        }
      )
      const data = await response.json()

      if (data.message) {
        setError(data.message[0].messages[0].message)

        return
      }

      console.log('data', data)
      setUser(data)
    } catch (err) {
      setError('Something went wrong ', err)
    }
  }

  return (
    <div>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder='Username'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder='E-mail'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Signup</button>
      </form>

      {error && <p className='font-large'>{error}</p>}
    </div>
  )
}
