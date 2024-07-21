import React from 'react';

import './Flotat-in.scss';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box/Box';

import { Result } from '../Result/Result';

interface FloatingComponentsProps {
  results: Object[];
  animationKey: number;
}

const FloatingComponents: React.FC<FloatingComponentsProps> = ({ results, animationKey }) => {
  return (
    <Box className={'results'}>
      <Stack spacing={2}>
        {results.map((component, index) => (
          <Result
            key={index}
            index={index}
            name={'SOLUTION'}
            description={'description,description,description,description'}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default FloatingComponents;
