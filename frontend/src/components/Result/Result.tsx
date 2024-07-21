import React from 'react';
import Typography from '@mui/material/Typography/Typography';
import { ProcessResearchApiCallThrowable } from '../../api/apiCalls';

interface ResultProps {
  index: number;
  name: string;
  description: string;
}

export const Result: React.FC<ResultProps> = ({ index, name, description }) => {
  const handleClick = () => {
    ProcessResearchApiCallThrowable(name, description);
  };
  return (
    <article className={'float-in result'} key={index} onClick={handleClick}>
      <Typography className={'response__title'} variant={'h4'}>
        {name}
      </Typography>
      <p className={'response__description'}>{description}</p>
    </article>
  );
};
