import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

export default function Nav() {
  const { user } = useContext(UserContext)

  return (
    <ul className='nav'>
      <li>
        <NavLink to='/' exact>
          Home
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to='/create' exact>
            Create
          </NavLink>
        </li>
      )}
      {!user && (
        <>
          <li>
            <NavLink to='/login' exact>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to='/signup' exact>
              Signup
            </NavLink>
          </li>
        </>
      )}
    </ul>
  )
}
