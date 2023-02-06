
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'


const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user)
  return (
    <nav className="navbar-container">
      <img className="logo" src="apple_pie_bold_transparent_3.png" />
      <ul className="navbar-list">

        <li className='navbar-list'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <div className='navbar-button'>
              Home
            </div>
          </NavLink>
        </li>
        <li className='navbar-list'>
          <NavLink to='/login' exact={true} activeClassName='active'>
            <div className='navbar-button'>
              Login
            </div>
          </NavLink>
        </li>
        <li className='navbar-list'>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            <div className='navbar-button'>
              Sign Up
            </div>
          </NavLink>
        </li>
        <li className='navbar-list'>
          <NavLink to='/users' exact={true} activeClassName='active'>
            <div className='navbar-button'>
              Users
            </div>
          </NavLink>
        </li>
        {
          sessionUser?.author ? <li>
            <NavLink to="/new/post" exact={true} activeClassName='active'>
              <div className='navbar-button'>
                Create New Post
              </div>
            </NavLink>
          </li> : null
        }
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
