import React from 'react';

import './CenteredComponent.scss';

interface CenteredComponentProps {
  children: React.ReactNode;
}

const CenteredComponent: React.FC<CenteredComponentProps> = ({ children }) => {
  return <div className={'centered-container'}>{children}</div>;
};

export default CenteredComponent;
