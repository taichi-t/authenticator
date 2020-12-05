import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '@/client/components/Home/Home';
import Layout from '@/client/components/Layout/Layout';
import { authSelector, fetchAuth } from '@/client/features/auth/authSlice';
import { userSelector, fetchUser } from '@/client/features/users/userSlice';
import { useSelector, useDispatch } from 'react-redux';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(authSelector);
  const { user } = useSelector(userSelector);

  React.useEffect(() => {
    dispatch(fetchAuth());
    dispatch(fetchUser());
  }, [dispatch]);

  console.log({ auth, user });

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
