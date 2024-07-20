import React, { useState } from 'react';
import { CssBaseline, Container } from '@mui/material';

import Header from 'src/components/SearchComponents/Header';
import SearchForm from 'src/components/SearchComponents/SearchForm';
import { API_ENDPOINTS } from 'src/api/apiConfig';
import QuestionComponent from 'src/components/QuestionComponent/QuestionComponent';
import SearchResultComponent from 'src/components/SearchResultComponent/SearchResultComponent';
import FloatingComponents from 'src/components/SearchComponents/FloatingComponents';

import 'src/components/SearchComponents/Flotat-in.scss';

const mockResults = [
  <QuestionComponent key={1} />,
  <SearchResultComponent key={2} />
];

const SearchPage: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [components, setComponents] = useState<React.ReactNode[]>(mockResults);
  const [isDisplayingComps, setIsDisplayingComps] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted problem:', problem);

    setIsDisplayingComps(true);
    setAnimationKey(prevKey => prevKey + 1); // Change the key to re-trigger the animation
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Header
        title="AI Shopping Assistant"
        description="Describe what you need, and we'll find the perfect solution"
      />
      <SearchForm
        problem={problem}
        onProblemChange={(e) => setProblem(e.target.value)}
        onSubmit={handleSubmit}
      />
      {isDisplayingComps && (
        <FloatingComponents components={components} animationKey={animationKey}/>
      )}
    </Container>
  );
};

export default SearchPage;
