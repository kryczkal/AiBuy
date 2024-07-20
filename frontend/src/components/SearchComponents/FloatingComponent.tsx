import React from 'react';

import './FloatingComponent.scss';

interface FloatingComponentProps {
  children: React.ReactNode; // This allows any valid React node as a child
  floatUp: boolean; // This is a boolean prop that determines whether the component should float up
}

const FloatingComponent: React.FC<FloatingComponentProps> = ({ children, floatUp }) => {
  return <div className={floatUp ? 'floating-up' : ''}>{children}</div>;
};

export default FloatingComponent;
