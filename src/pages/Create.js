import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'

export default function Create() {
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')

  const { user } = useContext(UserContext)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!user) {
      setError('Please log in first')

      return
    }

    if (!description) {
      setError('Please add a description')
      return
    }

    if (!file) {
      setError('Please add a File')
      return
    }

    const formData = new FormData()
    formData.append('data', JSON.stringify({ description }))
    formData.append('files.image', file)

    try {
      const response = await fetch('http://localhost:1337/posts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.jwt}`
        },
        body: formData
      })

      const data = await response.json()

      console.log('data', data)
    } catch (err) {
      setError(err)
    }
  }

  return (
    <div className='Create'>
      <h2>Create</h2>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={description}
          onChange={(event) => {
            setError('')
            setDescription(event.target.value)
          }}
          placeholder='Description'
        />
        <input
          type='file'
          placeholder='Add a File'
          onChange={(event) => {
            setError('')
            setFile(event.target.files[0])
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  )
}
