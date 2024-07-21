import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import React from 'react';

import NotFound from '../NotFound/NotFound';
import ItemRecommendationBoxTest from '../TestPages/ItemRecommendationBoxTest';
import Layout from '../Layout/Layout';
import './App.scss';


import SearchPage from 'src/pages/SearchPage/SearchPage';

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/search" />} />
            <Route path="/search" element={<SearchPage />} />
            // Test pages
            <Route path="/testItemRecBox" element={<ItemRecommendationBoxTest />} />
            <Route path="*" element={<NotFound />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
