import React, { useState } from 'react';

import CenteredComponent from '../../components/SearchComponents/CenteredComponent';
import FloatingComponent from '../../components/SearchComponents/FloatingComponent';
import { ProcessQueryResult } from '../../models/ProcessQueryResult';
import { ProcessQueryApiCallThrowable } from '../../api/apiCalls';

import SearchForm from 'src/components/SearchForm/SearchForm';
import FloatingComponents from 'src/components/SearchComponents/FloatingComponents';
import HeaderWrapper from 'src/components/HeaderWrapper/HeaderWrapper';


const SearchPage: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isDisplayingComps, setIsDisplayingComps] = useState(false);
  const [isValidResponse, setIsValidResponse] = useState(false);
  const [requestData, setRequestData] = useState<ProcessQueryResult | null>(null);
  const [questionCounter, setQuestionCounter] = useState(0);

  const handleQuestionSubmit = (question, answer) => {
    setQuestions(questions.concat(question));
    setAnswers(answers.concat(answer));

    setQuestionCounter(questionCounter - 1);
    console.log('Question counter:', questionCounter);

    if (questionCounter === 0) {
      ProcessQueryApiCallThrowable(problem, questions, answers)
        .then((data) => {
          console.log('Received data:', data);
          setRequestData(data);
          if (data.status === 'need_more_details') {
            setQuestionCounter(data.questions.length);
            console.log('New question counter:', questionCounter);
          }

          setIsValidResponse(data.status === 'success');
        })
        .catch((error) => {
          console.error('Error processing query:', error);
        });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.error('Submitted problem:', problem);

    setQuestions([]);
    setAnswers([]);

    ProcessQueryApiCallThrowable(problem, questions, answers)
      .then((data) => {
        console.log('Received data:', data);
        setRequestData(data);
        if (data.status === 'need_more_details') {
          setQuestionCounter(data.questions.length);
          console.log('New question counter array:', data.questions.length);
          console.log('New question counter:', questionCounter);
        }

        setIsValidResponse(data.status === 'success');
        setIsDisplayingComps(true);
      })
      .catch((error) => {
        console.error('Error processing query:', error);
      });
  };

  return (
    <CenteredComponent>
      <FloatingComponent floatUp={isDisplayingComps}>
        <HeaderWrapper
          title="AI Shopping Assistant"
          description="Describe what you need, and we'll find the perfect solution"
        />
        <SearchForm problem={problem} onProblemChange={(e) => setProblem(e.target.value)} onSubmit={handleSubmit} />
        {isDisplayingComps && <FloatingComponents isValidPrompt={isValidResponse} data={requestData} processQuestion={handleQuestionSubmit}/>}
      </FloatingComponent>
    </CenteredComponent>
  );
};

export default SearchPage;
