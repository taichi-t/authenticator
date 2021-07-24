/** @jsx jsx */
import * as React from 'react';
import { jsx } from '@emotion/react';
import { authSelector } from '@/features/auth/slice';
import { useSelector } from 'react-redux';

const Home: React.FC = () => {
  const { auth } = useSelector(authSelector);
  return auth.isAuthenticated ? (
    <p>You are logged in.</p>
  ) : (
    <p>You are not logged in. Please login or signup</p>
  );
};

export default Home;
