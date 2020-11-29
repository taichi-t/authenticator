import * as React from 'react';
import axios from 'axios';
import { BASESERVERURL } from '@/config/index';

const Header: React.FC = () => {
  const handleLogout = async () => {
    try {
      const res = await axios.get('/api/auth/logout');
      console.log(res);
    } catch (err) {
      console.error(err);
    }
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
