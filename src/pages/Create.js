import { useState } from 'react'

export default function Create() {
  const [description, setDescription] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = await fetch('http://localhost:1337/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description
      })
    })

    const data = await response.json()

    console.log('data', data)
  }

  return (
    <div className='Create'>
      <h2>Create</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder='Description'
        />
        <button>Submit</button>
      </form>
    </div>
  )
}
