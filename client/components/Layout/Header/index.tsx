/** @jsx jsx */

import * as React from 'react';
import LoggedinStatus from '@/components/Layout/Header/LoggedinStatus';
import { Button } from '@material-ui/core';
import authApi from '@/api/auth';
import { css, jsx } from '@emotion/react';
import useGlobalMessage from '@/hooks/useGlobalMessage';

const Header: React.FC = () => {
  const { onSendMessage } = useGlobalMessage();
  const handleLogout = async () => {
    await authApi.logout((res, err) => {
      if (res) {
        window.location.reload();
      } else {
        console.error(err);
        onSendMessage('Something wrong, please try again', 'error');
      }
    });
  };

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        margin: 16px 8px;
      `}
    >
      <Button
        color="primary"
        onClick={() => handleLogout()}
        css={css`
          margin-right: 8px;
        `}
        variant="outlined"
      >
        logout
      </Button>
      <LoggedinStatus />
    </div>
  );
};

export default Header;
