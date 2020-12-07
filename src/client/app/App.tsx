import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '@/client/components/Home/Home';
import Layout from '@/client/components/Layout/Layout';
import { authSelector } from '@/client/features/auth/slice';
import { fetchAuth } from '@/client/features/auth/asyncActions';
import { useSelector, useDispatch } from 'react-redux';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(authSelector);

  React.useEffect(() => {
    dispatch(fetchAuth());
  }, [dispatch]);

  console.log({ auth });

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
