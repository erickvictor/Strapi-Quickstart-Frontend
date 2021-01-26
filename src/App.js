// import logo from './logo.svg'
import { useEffect, useState } from 'react'
import './App.css'
import Post from './components/Post'

const mockPosts = [
  {
    id: 1,
    likes: 20,
    description: 'This is a post',
    image: {
      url: '/uploads/Squash_6d1ec8389b.JPG'
    }
  },
  {
    id: 2,
    likes: 33,
    description: 'The second post',
    image: {
      url: '/uploads/Squash_6d1ec8389b.JPG'
    }
  }
]

function App() {
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
    <div className='App'>
      {posts.map((post) => (
        <Post
          key={post.id}
          likes={post.likes}
          description={post.description}
          url={post.image && post.image.url}
        />
      ))}
    </div>
  )
}

export default App
