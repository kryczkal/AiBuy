import * as React from 'react';
import Box from '@mui/material/Box';

import './Layout.scss';
import Main from './Main';
import Header from './Header';

const Layout = (): JSX.Element => {
  return (
    <Box
      gridTemplateRows={'auto 1fr auto '}
      gridTemplateColumns={'auto 1fr auto'}
      display={'grid'}
      style={{ minHeight: '100vh' }}
    >
      <Header />
      <Main />
    </Box>
  );
};
export default Layout;
