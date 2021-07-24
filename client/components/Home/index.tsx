/** @jsx jsx */

import getConfig from '@/config/index';
import { useSelector } from 'react-redux';
import { authSelector } from '@/features/auth/slice';
import { Button } from '@material-ui/core';
import GoogleBtnNormal from '@/assets/images/btn_google_light_normal_ios.svg';
import GoogleDisabledBtn from '@/assets/images/btn_google_light_disabled_ios.svg';
import { css, jsx } from '@emotion/react';

const Home: React.FC = () => {
  const { auth } = useSelector(authSelector);

  return (
    <ul
      css={css`
        text-align: center;
        list-style: none;
        & > *:not(:last-of-type):nth-of-type(n) {
          margin-bottom: 8px;
        }
      `}
    >
      <li>
        <Button
          color="primary"
          variant="outlined"
          href={`${getConfig().API_ENDPOINT}/api/auth/login/google`}
          startIcon={auth.loading ? <GoogleDisabledBtn /> : <GoogleBtnNormal />}
          disabled={auth.loading}
        >
          Sign in with Google
        </Button>
      </li>

      <li>
        <Button
          color="primary"
          variant="outlined"
          href={`${getConfig().API_ENDPOINT}/api/auth/signup/google`}
          startIcon={auth.loading ? <GoogleDisabledBtn /> : <GoogleBtnNormal />}
          disabled={auth.loading}
        >
          Sign up with Google
        </Button>
      </li>
    </ul>
  );
};

export default Home;
