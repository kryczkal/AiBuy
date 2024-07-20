import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';

import NotFound from '../NotFound/NotFound';

import SearchPage from 'src/pages/SearchPage/SearchPage';
import TestingPage from 'src/pages/Testing/TestingPage';

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/search' />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/testing' element={<TestingPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
