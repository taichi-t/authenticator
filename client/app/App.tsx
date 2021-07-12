import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '@/components/Home/Home';
import Layout from '@/components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '@/features/auth/slice';
import { fetchAuth } from '@/features/auth/asyncActions';
import GlobalStyles from '@/GlobalStyles';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(authSelector);

  React.useEffect(() => {
    dispatch(fetchAuth());
  }, []);

  console.log(auth);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
