import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';

import NotFound from '../NotFound/NotFound';

import QuestionComponentTest from '../TestPages/QuestionComponentTest';
import ItemRecommendationBoxTest from '../TestPages/ItemRecommendationBoxTest';
import ProductRecommendationBoxTest from '../TestPages/ProductRecommendationBoxTest';

import SearchPage from 'src/pages/SearchPage/SearchPage';


const App = () => {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/search' />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='*' element={<NotFound />} />
          // Test pages

          <Route path='/testQuestionComp' element={<QuestionComponentTest/>}/>
          <Route path='/testItemRecBox' element={<ItemRecommendationBoxTest/>}/>
          <Route path='/testProdRecBox' element={<ProductRecommendationBoxTest/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
