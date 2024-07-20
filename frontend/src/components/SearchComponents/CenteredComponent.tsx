import React from 'react';

import './CenteredComponent.scss';

interface CenteredComponentProps {
  children: React.ReactNode; // This allows any valid React node as a child
}

const CenteredComponent: React.FC<CenteredComponentProps> = ({ children }) => {
  return <div className={'centered-container'}>{children}</div>;
};

export default CenteredComponent;
