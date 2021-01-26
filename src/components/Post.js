const post = {
  id: 1,
  description: 'He playing squash a few years ago',
  likes: 20,
  author: null,
  published_at: '2021-01-25T19:55:34.164Z',
  created_at: '2021-01-25T19:55:28.977Z',
  updated_at: '2021-01-25T19:55:34.193Z',
  image: {
    id: 1,
    name: 'Squash.JPG',
    alternativeText: '',
    caption: '',
    width: 1060,
    height: 530,
    formats: {
      thumbnail: {
        name: 'thumbnail_Squash.JPG',
        hash: 'thumbnail_Squash_6d1ec8389b',
        ext: '.JPG',
        mime: 'image/jpeg',
        width: 245,
        height: 122,
        size: 7.68,
        path: null,
        url: '/uploads/thumbnail_Squash_6d1ec8389b.JPG'
      },
      large: {
        name: 'large_Squash.JPG',
        hash: 'large_Squash_6d1ec8389b',
        ext: '.JPG',
        mime: 'image/jpeg',
        width: 1000,
        height: 500,
        size: 69.33,
        path: null,
        url: '/uploads/large_Squash_6d1ec8389b.JPG'
      },
      medium: {
        name: 'medium_Squash.JPG',
        hash: 'medium_Squash_6d1ec8389b',
        ext: '.JPG',
        mime: 'image/jpeg',
        width: 750,
        height: 375,
        size: 45.52,
        path: null,
        url: '/uploads/medium_Squash_6d1ec8389b.JPG'
      },
      small: {
        name: 'small_Squash.JPG',
        hash: 'small_Squash_6d1ec8389b',
        ext: '.JPG',
        mime: 'image/jpeg',
        width: 500,
        height: 250,
        size: 24.13,
        path: null,
        url: '/uploads/small_Squash_6d1ec8389b.JPG'
      }
    },
    hash: 'Squash_6d1ec8389b',
    ext: '.JPG',
    mime: 'image/jpeg',
    size: 76.09,
    url: '/uploads/Squash_6d1ec8389b.JPG',
    previewUrl: null,
    provider: 'local',
    provider_metadata: null,
    created_at: '2021-01-25T19:54:18.617Z',
    updated_at: '2021-01-25T19:54:18.633Z'
  }
}

const API_URL = 'http://localhost:1337'

const formatImageUrl = (url) => `${API_URL}${url}`

export default function Post({ description, likes, url }) {
  return (
    <div className='Post'>
      <img
        className='Post__Image'
        src={formatImageUrl(url)}
        alt={description}
      />
      <h4>{description}</h4>
      <div>
        <span>Likes: {likes}</span>
      </div>
    </div>
  )
}
