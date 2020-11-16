import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '@/client/components/Home/Home';
import Layout from '@/client/components/Layout/Layout';
import { authSelector, fetchData } from '@/client/features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { mockData } = useSelector(authSelector);

  React.useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  console.log({ mockData });

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

if (module.hot) {
  module.hot.accept();
  console.log('changed');
}

export default App;
