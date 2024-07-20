import React, { useState } from 'react';
import { CssBaseline, Container } from '@mui/material';

import Header from 'src/components/SearchComponents/Header';
import SearchForm from 'src/components/SearchComponents/SearchForm';
import { API_ENDPOINTS } from 'src/api/apiConfig';

const SearchPage: React.FC = () => {
  const [problem, setProblem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted problem:', problem);
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Header title="AI Shopping Assistant" description="Describe what you need, and we'll find the perfect solution" />
      <SearchForm problem={problem} onProblemChange={(e) => setProblem(e.target.value)} onSubmit={handleSubmit} />
    </Container>
  );
};

export default SearchPage;
