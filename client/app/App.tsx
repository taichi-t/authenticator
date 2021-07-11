import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '@/components/Home/Home';
import Layout from '@/components/Layout/Layout';

const App: React.FC = () => {
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
