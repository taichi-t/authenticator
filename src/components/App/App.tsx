import * as React from 'react';
import AuthProvider from '@/lib/AuthProvider';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '@/src/components/Home/Home';
import Layout from '@/src/components/Layout/Layout';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
