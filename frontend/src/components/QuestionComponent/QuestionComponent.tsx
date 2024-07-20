import React, { useState } from 'react';
import './QuestionComponent.scss';

interface QuestionComponentProps {
  question: string;
  onAnswerChange: (answer: string) => void; // callback to pass answer to the parent
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ question, onAnswerChange }) => {
  const [answer, setAnswer] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswer = event.target.value;
    setAnswer(newAnswer);
    onAnswerChange(newAnswer);
  };

  return (
    <div className="question-container">
      <p className="question">{question}</p>
      <input
        className="answer-input"
        type="text"
        value={answer}
        onChange={handleInputChange}
        placeholder="Type your answer here..."
      />
    </div>
  );
};

export default QuestionComponent;
