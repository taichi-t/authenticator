/** @jsx jsx */
import * as React from 'react';
import { jsx } from '@emotion/react';
import { authSelector } from '@/features/auth/slice';
import { useSelector } from 'react-redux';
import { Tooltip, Avatar } from '@material-ui/core';
import LoadingIcon from '@/assets/images/loading.svg';
import SuccessedIcon from '@/assets/images/check_circle_outline_black_48dp.svg';
import FailedIcon from '@/assets/images/highlight_off_black_48dp.svg';
import UnexpectedIcon from '@/assets/images/help_outline_black_48dp.svg';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { green, pink, red } from '@material-ui/core/colors';

const useStyles = makeStyles(() =>
  createStyles({
    pink: {
      backgroundColor: pink[500],
    },
    green: {
      backgroundColor: green[500],
    },
    red: {
      backgroundColor: red[500],
    },
  })
);

const LoggedinStatus: React.FC = () => {
  const classes = useStyles();
  const { auth } = useSelector(authSelector);
  if (auth.loading) {
    return (
      <Tooltip title="Loading...">
        <Avatar>
          <LoadingIcon />
        </Avatar>
      </Tooltip>
    );
  }
  if (auth.isAuthenticated) {
    return (
      <Tooltip title="You are logged in.">
        <Avatar className={classes.green}>
          <SuccessedIcon />
        </Avatar>
      </Tooltip>
    );
  }
  if (!auth.isAuthenticated && auth.error) {
    return (
      <Tooltip title={auth.error.message}>
        <Avatar className={classes.red}>
          <FailedIcon />
        </Avatar>
      </Tooltip>
    );
  }

  return (
    <Tooltip title="Something wrong, please reload.">
      <Avatar>
        <UnexpectedIcon />
      </Avatar>
    </Tooltip>
  );
};

export default React.memo(LoggedinStatus);
