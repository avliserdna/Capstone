
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import { login } from '../store/session';
const NavBar = () => {

  const sessionUser = useSelector((state) => state.session.user)
  const dispatch = useDispatch()
  const demoLogin = async (e) => {
    e.preventDefault()
    const data = await dispatch(login('demo@aa.io', 'password'))
  }
  return (
    <nav className="navbar-container">

      <img className="logo" src="/apple_pie_bold_transparent_3.png" />
      <ul className="navbar-list">
        {sessionUser ? <li className='navbar-list'>
          <div className="navbar-logged-in">
            Hello {sessionUser?.username}!
          </div>

        </li> : null}

        <li className='navbar-list'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <div className='navbar-button'>
              Home
            </div>
          </NavLink>
        </li>
        {sessionUser ? null :
          <li className='navbar-list'>


            <NavLink to='/login' exact={true} activeClassName='active'>
              <div className='navbar-button'>
                Login
              </div>
            </NavLink>

          </li>
        }
        {sessionUser ? null :
          <li className='navbar-list'>


            <NavLink to='/' exact={true} activeClassName='active' onClick={demoLogin}>
              <div className='navbar-button'>
                Demo Login
              </div>
            </NavLink>

          </li>
        }
        {sessionUser ? null : <li className='navbar-list'>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            <div className='navbar-button'>
              Sign Up
            </div>
          </NavLink>
        </li>
        }
        {
          sessionUser?.author ? <li>
            <NavLink to="/new/post" exact={true} activeClassName='active'>
              <div className='navbar-button'>
                Create New Post
              </div>
            </NavLink>
          </li> : null
        }
        {sessionUser ? <li>
          <LogoutButton />
        </li> : null}
      </ul>
    </nav>
  );
}

export default NavBar;
