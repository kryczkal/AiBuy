import React from 'react';
import Typography from '@mui/material/Typography/Typography';

interface ResultProps {
  index: number;
  name: string;
  description: string;
}

export const Result: React.FC<ResultProps> = ({ index, name, description }) => {
  return <article className={'float-in result'} key={index}>
    <Typography className={'response__title'} variant={'h4'}>
      {name}
    </Typography>
    <p className={'response__description'}>{description}</p>
  </article>;
};
