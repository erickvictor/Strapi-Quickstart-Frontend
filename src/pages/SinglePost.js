import { useEffect, useState } from 'react'
import Post from '../components/Post'

export default function SinglePost({ match }) {
  const { id } = match.params

  const [post, setPost] = useState({})

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`http://localhost:1337/posts/${id}`)
      const data = await response.json()

      console.log('data', data)
      setPost(data)
    }
    fetchPost()
  }, [id])
  return (
    <div className='SinglePost'>
      <Post
        likes={post.likes}
        description={post.description}
        url={post.image && post.image.url}
      />
    </div>
  )
}
