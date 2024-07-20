import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import React from 'react';

import NotFound from '../NotFound/NotFound';
import ItemRecommendationBox from '../../components/ItemRecommendationBoxComponent/ItemRecommendationBox';
import Layout from '../Layout/Layout';

import SearchPage from 'src/pages/SearchPage/SearchPage';
import QuestionComponent from 'src/components/QuestionComponent/QuestionComponent';

import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/search" />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            // Pass pages in Route not the components
            path="/testQuestionComp"
            element={<QuestionComponent question="Test Question" onAnswerChange={(answer: string) => console} />}
          />
          <Route
            // Route to test component

            path="/testQuestionComp"
            element={<QuestionComponent question="Test Question" onAnswerChange={(answer: string) => console} />}
          />
          <Route
            // Route to test component

            path="/testItemRecBox"
            element={
              <ItemRecommendationBox
                itemName="Test Item"
                itemDesc="Test Description"
                itemPros={['Pro 1', 'Pro 2']}
                itemCons={['Con 1', 'Con 2']}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
