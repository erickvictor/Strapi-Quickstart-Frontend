import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'

export default function Login({ history }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { user, setUser } = useContext(UserContext)
  console.log('user', user)

  useEffect(() => {
    if (user) {
      history.push('/')
    }
  }, [user, history])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:1337/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier: email,
          password
        })
      })

      const data = await response.json()
      console.log('data', data)

      if (data.message) {
        setError(data.message[0].messages[0].message)
        return //Stop execution
      }

      setUser(data)
    } catch (err) {
      setError('Something went wrong ' + err)
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type='email'
          value={email}
          onChange={(e) => {
            setError('')
            setEmail(e.target.value)
          }}
        />
        <input
          type='password'
          value={password}
          onChange={(e) => {
            setError('')
            setPassword(e.target.value)
          }}
        />
        <button>Login</button>
      </form>

      {error && <p className='font-medium'>{error}</p>}
    </div>
  )
}
