import {Route, Routes, Navigate, BrowserRouter} from 'react-router-dom';
import React from 'react';

import NotFound from '../NotFound/NotFound';
import QuestionComponentTest from '../TestPages/QuestionComponentTest';
import ItemRecommendationBoxTest from '../TestPages/ItemRecommendationBoxTest';
import Layout from '../Layout/Layout';

import SearchPage from 'src/pages/SearchPage/SearchPage';
import TestingPage from 'src/pages/Testing/TestingPage';
// import ItemRecommendation from 'src/components/ItemRecommendation/ItemRecommendation';


const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/' element={<Navigate to='/search' />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='*' element={<NotFound />} />

            // Test pages

            <Route path='/testQuestionComp' element={<QuestionComponentTest/>}/>
            <Route path='/testItemRecBox' element={<ItemRecommendationBoxTest/>}/>
            <Route path='/testing' element={<TestingPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
