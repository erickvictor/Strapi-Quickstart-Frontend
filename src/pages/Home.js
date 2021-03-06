import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Post from '../components/Post'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch('http://localhost:1337/posts')
      const data = await response.json()
      setPosts(data)
    }
    getPosts()
  }, [])

  return (
    <div className='Home'>
      {posts.map((post) => (
        <Link key={post.id} to={`/${post.id}`}>
          <Post
            key={`post-${post.id}`}
            likes={post.likes}
            description={post.description}
            url={post.image && post.image.url}
          />
        </Link>
      ))}
    </div>
  )
}
