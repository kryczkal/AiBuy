import React, { useState } from 'react';

import CenteredComponent from '../../components/SearchComponents/CenteredComponent';
import FloatingComponent from '../../components/SearchComponents/FloatingComponent';

import SearchForm from 'src/components/SearchForm/SearchForm';
import SearchResultComponent from 'src/components/SearchResultComponent/SearchResultComponent';
import FloatingComponents from 'src/components/SearchComponents/FloatingComponents';
import HeaderWrapper from 'src/components/HeaderWrapper/HeaderWrapper';


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
    console.error('Submitted problem:', problem);

    setIsDisplayingComps(true);
    setAnimationKey(prevKey => prevKey + 1); // Change the key to re-trigger the animation
  };

  return (
      <CenteredComponent>
        <FloatingComponent floatUp={isDisplayingComps}>
          <HeaderWrapper
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
