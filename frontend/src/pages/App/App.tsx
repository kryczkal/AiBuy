import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';

import NotFound from '../NotFound/NotFound';
import ItemRecommendationBox from '../../components/ItemRecommendation/ItemRecommendationBox';

import SearchPage from 'src/pages/SearchPage/SearchPage';
import QuestionComponent from 'src/components/QuestionComponent/QuestionComponent';
import ItemRecommendation from 'src/components/ItemRecommendation/ItemRecommendation';


const App = () => {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/search' />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='*' element={<NotFound />} />

          // Routes to test components
          <Route path='/testQuestionComp' element={<QuestionComponent question="Test Question" onAnswerChange={
            (answer: string) => console
          }
                                                   />}
          />
          <Route path='/testItemRecBox' element={<ItemRecommendationBox itemName="Test Item" itemDesc="Test Description" itemPros={['Pro 1', 'Pro 2']} itemCons={['Con 1', 'Con 2']} />}/>
          <Route path='/testItemRec' element={<ItemRecommendation items={[
            {
              itemName: 'Test Item 1',
              itemDesc: 'Test Description 1',
              itemPros: ['Pro 1', 'Pro 2'],
              itemCons: ['Con 1', 'Con 2'],
            },
            {
              itemName: 'Test Item 2',
              itemDesc: 'Test Description 2',
              itemPros: ['Pro 3', 'Pro 4'],
              itemCons: ['Con 3', 'Con 4'],
            },
            {
              itemName: 'Test Item 3',
              itemDesc: 'Test Description 3',
              itemPros: ['Pro 5', 'Pro 6'],
              itemCons: ['Con 5', 'Con 6'],
            },
          ]}
                                              />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
