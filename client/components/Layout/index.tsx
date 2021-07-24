import * as React from 'react';
import Footer from './Footer';
import Header from './Header';

type Props = {
  children?: React.ReactElement;
};

const Layout: React.FC = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
