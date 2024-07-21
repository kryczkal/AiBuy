import React, { useState } from 'react';
import './QuestionComponent.scss';

interface QuestionComponentProps {
  question: string;
  onAnswerChange: (answer: string) => void;
  onAnswerSubmit: (question: string, answer: string) => void;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ question, onAnswerChange, onAnswerSubmit }) => {
  const [answer, setAnswer] = useState('');
  const [visibility, setVisibility] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswer = event.target.value;
    setAnswer(newAnswer);
    onAnswerChange(newAnswer);
  };

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (answer) {
        onAnswerSubmit(question, answer);
        setVisibility(false);
      }
    }
  };

  return visibility ? (
    <article className="question-container">
      <p className="question">{question}</p>
      <input
        className="answer-input"
        type="text"
        value={answer}
        id={question}
        onChange={handleInputChange}
        placeholder="Type your answer here..."
        required
        onKeyDown={handleSubmit}
      />
    </article>
  ) : null;
};

export default QuestionComponent;
