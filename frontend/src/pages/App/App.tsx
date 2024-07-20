import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';

import NotFound from '../NotFound/NotFound';

import SearchPage from 'src/pages/SearchPage/SearchPage';
import QuestionComponent from 'src/components/QuestionComponent/QuestionComponent';


const App = () => {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/search' />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='*' element={<NotFound />} />

          // Routes to test components
          <Route path='/testQuestionComp' element={<QuestionComponent question="Test Question" onAnswerChange ={
            (answer: string) => console
          }
                                                   />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
