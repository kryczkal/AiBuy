import React, { useState } from 'react';
import './Flotat-in.scss';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box/Box';

import { Result } from '../Result/Result';
import QuestionComponent from '../QuestionComponent/QuestionComponent';
import { ProcessQueryResult } from '../../models/ProcessQueryResult';

interface FloatingComponentsProps {
  animationKey: number;
}

const FloatingComponents: React.FC<FloatingComponentsProps> = ({ animationKey }) => {
  const mockResult: ProcessQueryResult = {
    status: 'success',
    questions: [
      'What is your favorite color?',
      'What is your preferred music genre?',
      'What kind of activities do you enjoy?',
    ],
    components: [
      {
        itemName: 'Noise-Cancelling Headphones',
        itemDesc: 'Immerse yourself in your favorite music or podcasts without distractions.',
        itemImgUrl: 'https://example.com/headphones.jpg',
      },
      {
        itemName: 'Smart Speaker',
        itemDesc: 'Control your smart home devices, play music, and get answers with voice commands.',
        itemImgUrl: 'https://example.com/speaker.jpg',
      },
      {
        itemName: 'Fitness Tracker',
        itemDesc: 'Track your steps, heart rate, and sleep patterns to stay active and healthy.',
        itemImgUrl: 'https://example.com/tracker.jpg',
      },
    ],
  };
  // Add more search results with different questions and items
  const isValidPrompt = false;
  const [result, setResults] = useState<ProcessQueryResult>(mockResult);
  const [jsonData, setJsonData] = useState({});

  const handleQuestionSubmit = (question, answer) => {
    const updatedJsonData = { ...jsonData };
    updatedJsonData[question] = answer; // Use question as key
    setJsonData(updatedJsonData);
    console.log('JSON Data:', updatedJsonData); // Update and log the JSON object
  };
  const handleAnswerSubmit = (question: string, answer: string ) => {
    // setAnswers([...answers, answer]); // Update answers array with the submitted answer
    console.log('Submitted Answer:', answer, 'and questions:', question); // Optionally log the answer for debugging or further processing
  };

  return (
    <Box className="results">
      <Stack spacing={2}>
        {isValidPrompt &&
          result.components.map((component, index) => (
            <Result
              key={index}
              index={index}
              name="SOLUTION"
              description="description,description,description,description"
            />
          ))}
        {!isValidPrompt && (
          <form >
            {result.questions.map((question) => (
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
