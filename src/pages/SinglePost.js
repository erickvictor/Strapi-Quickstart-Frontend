import { useContext, useEffect, useState } from 'react'
import Post from '../components/Post'

import { UserContext } from '../context/UserContext'

export default function SinglePost({ match, history }) {
  const { id } = match.params

  const { user, setUser } = useContext(UserContext)
  console.log('context', user, setUser)

  const [post, setPost] = useState({})
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(false)
  const [description, setDescription] = useState('')

  const fetchPost = async () => {
    const response = await fetch(`http://localhost:1337/posts/${id}`)
    console.log(response.status)
    if (response.status <= 400) {
      const data = await response.json()

      console.log('data', data)
      setPost(data)
      setDescription(data.description)
    }
    setLoading(false)
  }

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:1337/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.jwt}`
      }
    })
    const data = await response.json()
    console.log(data)
    history.push('/')
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    console.log('Edit')
    const response = await fetch(`http://localhost:1337/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.jwt}`
      },
      body: JSON.stringify({
        description
      })
    })
    const data = await response.json()
    fetchPost()
    console.log('edit', data)
  }

  // eslint-disable-next-line
  useEffect(() => fetchPost(), [])

  return (
    <div className='SinglePost'>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          {post.id && (
            <>
              <Post
                likes={post.likes}
                description={post.description}
                url={post.image && post.image.url}
              />
              {user && (
                <>
                  <button onClick={handleDelete}>Delete this Post</button>
                  <button onClick={() => setEdit(true)}>Edit this Post</button>
                  {edit && (
                    <form onSubmit={handleEditSubmit}>
                      <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='New description'
                      />
                      <button>Confirm</button>
                    </form>
                  )}
                </>
              )}
            </>
          )}
          {!post.id && <p className='font-large'>404 - Not found</p>}
        </>
      )}
    </div>
  )
}
