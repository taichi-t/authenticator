import * as React from 'react';
import getConfig from '@/config/index';
import authApi from '@/api/auth';

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
      <a
        type="button"
        href={`${getConfig().API_ENDPOINT}/api/auth/login/google`}
      >
        login
      </a>
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
