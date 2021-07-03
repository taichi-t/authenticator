import * as React from 'react';
import { BASESERVERURL } from '@/client/config/index';
import authApi from '@/client/api/auth';

const Header: React.FC = () => {
  const handleLogout = async () => {
    await authApi.logout((res, err) => {
      if (res) {
        console.log(res);
      } else {
        console.error(err);
      }
    });
  };

  return (
    <div>
      <button type="button" onClick={() => handleLogout()}>
        logout
      </button>
      <a type="button" href={`${BASESERVERURL}/api/auth/login/google`}>
        login
      </a>
      <a type="button" href={`${BASESERVERURL}/api/auth/signup/google`}>
        signup
      </a>
    </div>
  );
};

export default Header;
