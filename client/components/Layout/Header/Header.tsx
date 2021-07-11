import * as React from 'react';
import getConfig from '@/config/index';
import authApi from '@/api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '@/features/auth/slice';
import { fetchAuth } from '@/features/auth/asyncActions';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(authSelector);
  const handleLogout = async () => {
    await authApi.logout((res, err) => {
      if (res) {
        console.log(res);
      } else {
        console.error(err);
      }
    });
  };

  const handleClick = () => {
    dispatch(fetchAuth());
  };

  console.log({ auth });

  return (
    <div>
      <button type="button" onClick={() => handleLogout()}>
        logout
      </button>
      <a
        type="button"
        href={`${getConfig().API_ENDPOINT}/api/auth/login/google`}
      >
        login
      </a>
      <button type="button" onClick={handleClick}>
        getUser
      </button>
      <a
        type="button"
        href={`${getConfig().API_ENDPOINT}/api/auth/signup/google`}
      >
        signup
      </a>
    </div>
  );
};

export default Header;
