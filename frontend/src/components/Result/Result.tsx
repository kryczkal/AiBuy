import React from 'react';

interface ResultProps {
  index: number;
  name: string;
  description: string;
}

export const Result: React.FC<ResultProps> = ({ index, name, description }) => {
  return <article className={'float-in'} key={index}></article>;
};
