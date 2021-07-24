import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '@/components/Home';
import Layout from '@/components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '@/features/auth/slice';
import { fetchUser } from '@/features/auth/asyncActions';
import GlobalStyles from '@/GlobalStyles';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import useGlobalMessage from '@/hooks/useGlobalMessage';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(authSelector);
  const {
    message,
    severity,
    open,
    onSendMessage,
    onCloseMessage,
  } = useGlobalMessage();

  React.useEffect(() => {
    dispatch(fetchUser());
  }, []);

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (auth.isAuthenticated) {
      return onSendMessage('You are successfully logged in.', 'success');
    }
    if (!auth.isAuthenticated && auth.error) {
      return onSendMessage(auth.error.message, 'error');
    }
    if (!auth.isAuthenticated && !auth.loading) {
      return onSendMessage('Something wrong, please reload', 'error');
    }
  }, [auth.isAuthenticated, auth.error, auth.loading]);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Layout>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
        ClickAwayListenerProps={{ onClickAway: () => onCloseMessage() }}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </BrowserRouter>
  );
};

export default App;
