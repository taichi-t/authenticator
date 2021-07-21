import * as React from 'react';
import getConfig from '@/config/index';
import authApi from '@/api/auth';
import { useSelector } from 'react-redux';
import { authSelector } from '@/features/auth/slice';
import { Button } from '@material-ui/core';
import GoogleBtnNormal from '@/assets/images/btn_google_light_normal_ios.svg';
import GoogleDisabledBtn from '@/assets/images/btn_google_light_disabled_ios.svg';

const Header: React.FC = () => {
  const { auth } = useSelector(authSelector);
  const handleLogout = async () => {
    await authApi.logout((res, err) => {
      if (res) {
        window.location.reload();
      } else {
        console.error(err);
      }
    });
  };

  return (
    <div>
      <Button color="primary" onClick={() => handleLogout()}>
        logout
      </Button>
      {/* TODO:loginをdipatch経由で行う */}
      <Button
        color="primary"
        variant="outlined"
        href={`${getConfig().API_ENDPOINT}/api/auth/login/google`}
        startIcon={auth.loading ? <GoogleDisabledBtn /> : <GoogleBtnNormal />}
      >
        Sign in with Google
      </Button>
      {/* TODO:singupをdipatch経由で行う */}
      <Button
        color="primary"
        variant="outlined"
        href={`${getConfig().API_ENDPOINT}/api/auth/signup/google`}
        startIcon={auth.loading ? <GoogleDisabledBtn /> : <GoogleBtnNormal />}
      >
        Sign up with Google
      </Button>
    </div>
  );
};

export default Header;
