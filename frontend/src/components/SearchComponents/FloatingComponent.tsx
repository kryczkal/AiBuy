import React from 'react';

import './FloatingComponent.scss';

interface FloatingComponentProps {
  children: React.ReactNode;
  floatUp: boolean;
}

const FloatingComponent: React.FC<FloatingComponentProps> = ({ children, floatUp }) => {
  return <div className={floatUp ? 'floating-up' : ''}>{children}</div>;
};

export default FloatingComponent;
