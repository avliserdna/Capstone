import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { emptyReaction } from '../../store/likesdislikes';
import './LogoutButton.css'
const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(emptyReaction())
  };

  return <button className="button-46" role="button" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
