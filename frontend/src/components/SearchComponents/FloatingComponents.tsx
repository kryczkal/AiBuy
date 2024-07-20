import React from 'react';

import './Flotat-in.scss';

interface FloatingComponentsProps {
  components: React.ReactNode[];
  animationKey: number
}

const FloatingComponents : React.FC<FloatingComponentsProps>= ({components, animationKey}) =>
{
  return (
    <div className='blocks' key={animationKey}>
      {components.map((component, index) => (
        <div key={index} className="float-in">
          {component}
        </div>
      ))}
    </div>
  );
};

export default FloatingComponents;
