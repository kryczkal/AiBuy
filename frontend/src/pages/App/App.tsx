import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import NotFound from '../NotFound/NotFound';

import SearchPage from 'src/pages/SearchPage/SearchPage';
import React from 'react';

import SearchPage from 'src/pages/SearchPage/SearchPage';

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/search' />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
