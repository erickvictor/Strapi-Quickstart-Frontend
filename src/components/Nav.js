import { NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <ul className='nav'>
      <li>
        <NavLink to='/' exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to='/create' exact>
          Create
        </NavLink>
      </li>
    </ul>
  )
}
