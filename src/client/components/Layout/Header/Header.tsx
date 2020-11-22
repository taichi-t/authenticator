import * as React from 'react';
import axios from 'axios';

const Header: React.FC = () => {
  const handleClick = async () => {
    try {
      const res = await axios.get('/api/auth/logout');
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <button type="button" onClick={() => handleClick()}>
        logout
      </button>
      header
    </div>
  );
};

export default Header;
