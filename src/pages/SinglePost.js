import { useContext, useEffect, useState } from 'react'
import Post from '../components/Post'

import { UserContext } from '../context/UserContext'
import { LikesContext } from '../context/LikesContext'

export default function SinglePost({ match, history }) {
  const { id } = match.params

  const { user, setUser } = useContext(UserContext)
  console.log('context', user, setUser)

  const { likesGiven, reloader } = useContext(LikesContext)

  const isPostAlreadyLiked = (() => {
    return (
      likesGiven &&
      likesGiven.find((like) => like.post && like.post.id === parseInt(id))
    )
  })()

  console.log('isPostAlreadyLiked', isPostAlreadyLiked)
  console.log('likesGiven', likesGiven)

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

  const handleLike = async () => {
    try {
      // eslint-disable-next-line
      const response = await fetch('http://localhost:1337/likes', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.jwt}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          post: parseInt(id)
        })
      })
      fetchPost()
      reloader()
    } catch (err) {
      console.log('Exception', err)
    }
  }

  const handleRemoveLike = async () => {
    try {
      // eslint-disable-next-line
      const response = await fetch(`http://localhost:1337/likes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.jwt}`
        }
      })
      fetchPost()
      reloader()
    } catch (err) {
      console.log('Exception', err)
    }
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
                  {!isPostAlreadyLiked && (
                    <button onClick={handleLike}>Like</button>
                  )}
                  {isPostAlreadyLiked && (
                    <button onClick={handleRemoveLike}>Remove Like</button>
                  )}
                </>
              )}

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
