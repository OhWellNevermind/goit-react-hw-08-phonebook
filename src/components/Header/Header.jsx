import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from 'redux/auth/operations';
import { selectIsLoggedIn, selectUser } from 'redux/auth/selectors';

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <header className="flex gap-3 font-bold w-full px-10 py-5 border-black border-b-2 justify-between max-h-[66px]">
      <div className="flex gap-3">
        <Link to="/">Home</Link>
        {isLoggedIn && <Link to="/contacts">Contacts</Link>}
      </div>
      {isLoggedIn ? (
        <div className="w-fit flex gap-5 items-center">
          <p className="font-bold">
            Hello, <span className="text-red-600">{user.name}</span>
          </p>
          <Button
            onClick={() => {
              dispatch(logout());
            }}
            variant="contained"
          >
            Log out
          </Button>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link to="/register">Sign Up</Link>
          <Link to="/login">Sign In</Link>
        </div>
      )}
    </header>
  );
};
