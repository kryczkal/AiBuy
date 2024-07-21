import React from 'react';
import './Flotat-in.scss';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box/Box';
import { Skeleton } from '@mui/material';

import { Result } from '../Result/Result';
import QuestionComponent from '../QuestionComponent/QuestionComponent';
import { ProcessQueryResult } from '../../models/ProcessQueryResult';

interface FloatingComponentsProps {
  data: ProcessQueryResult | null;
  isValidPrompt: boolean;
  isLoading: boolean;
  processQuestion: (question: string, answer: string) => void;
}

const FloatingComponents: React.FC<FloatingComponentsProps> = ({ data, isValidPrompt, isLoading, processQuestion }) => {
  const handleAnswerSubmit = (question: string, answer: string) => {
    // setAnswers([...answers, answer]); // Update answers array with the submitted answer
    console.log('Submitted Answer:', answer, 'and questions:', question); // Optionally log the answer for debugging or further processing
    processQuestion(question, answer);
  };

  if (!data && !isLoading) return <></>;

  return (
    <Box className="results">
      <Stack spacing={2}>
        {isLoading && (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} variant="rectangular" width="inherit" height={80} sx={{ borderRadius: '2rem' }} />
            ))}
          </>
        )}
        {data &&
          isValidPrompt &&
          data.components.map((component, index) => (
            <Result key={index} index={index} name={component.itemName} description={component.itemDesc} />
          ))}
        {data && !isLoading && !isValidPrompt && (
          <form style={{ width: '100%' }}>
            {data.questions.map((question) => (
              <QuestionComponent
                key={1} // Use question.id for unique key if available
                question={question}
                onAnswerChange={() => {}}
                onAnswerSubmit={handleAnswerSubmit}
              />
            ))}
          </form>
        )}
      </Stack>
    </Box>
  );
};

export default FloatingComponents;
