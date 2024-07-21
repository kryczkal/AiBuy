import React, { useEffect, useState } from 'react';
import './Flotat-in.scss';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box/Box';

import { Result } from '../Result/Result';
import QuestionComponent from '../QuestionComponent/QuestionComponent';
import { ProcessQueryResult } from '../../models/ProcessQueryResult';

interface FloatingComponentsProps {
  data: ProcessQueryResult | null;
  isValidPrompt: boolean;
  processQuestion: (question: string, answer: string) => void;
}

const FloatingComponents: React.FC<FloatingComponentsProps> = ({ data, isValidPrompt, processQuestion }) => {
  // Add more search results with different questions and items
  const [isLoading, setIsLoading] = useState(true);
  // temporary
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 2000); // 3 seconds in milliseconds
    return () => clearTimeout(timeout); // Cleanup function to prevent memory leaks
  }, []);

  const handleAnswerSubmit = (question: string, answer: string) => {
    // setAnswers([...answers, answer]); // Update answers array with the submitted answer
    console.log('Submitted Answer:', answer, 'and questions:', question); // Optionally log the answer for debugging or further processing
    processQuestion(question, answer);
  };

  if (data == null) return <></>;

  return (
    <Box className="results">
      <Stack spacing={2}>
        {isValidPrompt &&
          data.components.map((component, index) => (
            <Result key={index} index={index} name={component.itemName} description={component.itemDesc} />
          ))}
        {!isLoading && !isValidPrompt && (
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
