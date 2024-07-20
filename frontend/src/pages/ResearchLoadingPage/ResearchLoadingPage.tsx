import React, { useState, useEffect } from 'react';

import ResearchLoadingState from 'src/components/ResearchLoadingComponents/ResearchLoadingState';
import './ResearchLoadingPage.scss';

const ResearchLoadingPage: React.FC = () => {
  const [loadingMessage, setLoadingMessage] = useState('Starting research...');

  useEffect(() => {
    const messages = [
      'Starting research...',
      'Gathering data on latest models...',
      'Analyzing reviews and ratings...',
      'Compiling the best options...',
      'Finalizing recommendations...'
    ];

    const updateMessage = (index: number) => {
      setLoadingMessage(messages[index]);
      if (index < messages.length - 1) {
        setTimeout(() => updateMessage(index + 1), 2000);
      }
    };

    updateMessage(0);

    return () => {
      setLoadingMessage('Starting research...');
    };
  }, []);

  return (
    <div className="research-loading-page">
      <ResearchLoadingState loadingMessage={loadingMessage} />
    </div>
  );
};

export default ResearchLoadingPage;
