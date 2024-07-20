import React, { useState } from 'react';
import { CssBaseline, Container } from '@mui/material';

import Header from 'src/components/SearchComponents/Header';
import SearchForm from 'src/components/SearchComponents/SearchForm';
import { API_ENDPOINTS } from 'src/api/apiConfig';
import QuestionComponent from 'src/components/QuestionComponent/QuestionComponent';
import SearchResultComponent from 'src/components/SearchResultComponent/SearchResultComponent';

const mockResults = [
  <QuestionComponent key={1}/>,
  <SearchResultComponent key={2}/>
];

const SearchPage: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [components, setComponents] = useState<React.ReactNode[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted problem:', problem);

    setIsSearching(true);
    setComponents(mockResults);
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
      {isSearching && (
        <div className='blocks'>
          {components.map((component) => ( component ))}
        </div>
      )}
    </Container>
  );
};

export default SearchPage;
