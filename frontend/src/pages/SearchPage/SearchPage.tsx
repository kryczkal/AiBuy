import React, { useState, useEffect } from 'react';

import CenteredComponent from '../../components/SearchComponents/CenteredComponent';
import FloatingComponent from '../../components/SearchComponents/FloatingComponent';
import { ProcessQueryResult } from '../../models/ProcessQueryResult';
import { ProcessQueryApiCallThrowable } from '../../api/apiCalls';

import SearchForm from 'src/components/SearchForm/SearchForm';
import FloatingComponents from 'src/components/SearchComponents/FloatingComponents';
import HeaderWrapper from 'src/components/HeaderWrapper/HeaderWrapper';

const SearchPage: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidResponse, setIsValidResponse] = useState(false);
  const [requestData, setRequestData] = useState<ProcessQueryResult | null>(null);
  const [questionCounter, setQuestionCounter] = useState(0);

  useEffect(() => {
    console.log('Question counter updated:', questionCounter);
  }, [questionCounter]);

  const handleQuestionSubmit = (question, answer) => {
    setQuestions((prevQuestions) => prevQuestions.concat(question));
    setAnswers((prevAnswers) => prevAnswers.concat(answer));

    setQuestionCounter((prevCounter) => {
      const newCounter = prevCounter - 1;
      console.log('Question counter:', newCounter);
      return newCounter;
    });

    if (questionCounter === 1) { // Check if it's 1 before decrementing to 0
      ProcessQueryApiCallThrowable(problem, questions, answers)
        .then((data) => {
          console.log('Received data:', data);
          setRequestData(data);
          if (data.status === 'need_more_details') {
            setQuestionCounter(data.questions.length);
            console.log('New question counter:', data.questions.length);
          }

          setIsValidResponse(data.status === 'success');
        })
        .catch((error) => {
          console.error('Error processing query:', error);
        });
    }
  };

  useEffect(() => {
    if (isLoading) {
      ProcessQueryApiCallThrowable(problem, questions, answers)
        .then((data) => {
          console.log('Received data:', data);
          setRequestData(data);
            setAnswers([]);
            setQuestions([]);
            setIsValidResponse(data.status === 'success');
            if (data.status === 'need_more_details') {
                setQuestionCounter(data.questions.length);
                console.log('New question counter array:', data.questions.length);
            }
        })
        .catch((error) => {
          console.error('Error processing query:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [answers, isLoading, problem, questions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted problem:', problem);

    setQuestions([]);
    setAnswers([]);
    setRequestData(null); // Clear previous request data
    setIsLoading(true);
  };

  return (
    <CenteredComponent>
      <FloatingComponent floatUp={isLoading || requestData !== null}>
        <HeaderWrapper
          title="AI Shopping Assistant"
          description="Describe what you need, and we'll find the perfect solution"
        />
        <SearchForm problem={problem} onProblemChange={(e) => setProblem(e.target.value)} onSubmit={handleSubmit} />
        <FloatingComponents
          isValidPrompt={isValidResponse}
          data={requestData}
          isLoading={isLoading}
          processQuestion={handleQuestionSubmit}
        />
      </FloatingComponent>
    </CenteredComponent>
  );
};

export default SearchPage;
