import React, { useState } from 'react';

import CenteredComponent from '../../components/SearchComponents/CenteredComponent';
import FloatingComponent from '../../components/SearchComponents/FloatingComponent';

import Header from 'src/components/SearchComponents/Header';
import SearchForm from 'src/components/SearchComponents/SearchForm';
import SearchResultComponent from 'src/components/SearchResultComponent/SearchResultComponent';
import FloatingComponents from 'src/components/SearchComponents/FloatingComponents';


const mockResults = [
  <SearchResultComponent key={1} />,
  <SearchResultComponent key={2} />,
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
      <CenteredComponent>
        <FloatingComponent floatUp={isDisplayingComps}>
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
            <FloatingComponents components={components} animationKey={animationKey} />
          )}
        </FloatingComponent>
      </CenteredComponent>
  );
};

export default SearchPage;
