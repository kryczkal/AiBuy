import React from 'react';

import './FloatingComponent.scss';

interface FloatingComponentProps {
  children: React.ReactNode;
  floatUp: boolean;
}

const FloatingComponent: React.FC<FloatingComponentProps> = ({ children, floatUp }) => {
  return (
    <div style={{ maxWidth: '600px', marginBottom: '10rem' }} className={floatUp ? 'floating-up' : ''}>
      {children}
    </div>
  );
};

export default FloatingComponent;
