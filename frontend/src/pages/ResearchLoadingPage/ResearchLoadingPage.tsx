import React, { useState, useEffect } from 'react';

import ResearchLoadingState from 'src/components/ResearchLoadingComponents/ResearchLoadingState';
import './ResearchLoadingPage.scss';
import ResearchLoadingBackground from 'src/components/ResearchLoadingComponents/ResearchLoadingBackground';
import { ResearchStateMessage } from 'src/api/apiCalls';

const ResearchLoadingPage: React.FC = () => {
  const [messages, setMessages] = useState<ResearchStateMessage[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage: ResearchStateMessage = generateMessage();
      if (newMessage.type !== 'none') {
        setMessages(prevMessages => [...prevMessages, newMessage]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Temporary function to generate random messages (simulating a loading state)
  const generateMessage = (): ResearchStateMessage => {
    const types: ResearchStateMessage['type'][] = ['url', 'info', 'error', 'none'];
    const type = types[Math.floor(Math.random() * types.length)];
    let content = '';

    switch (type) {
      case 'url':
        content = 'Visiting: https://example.com';
        break;
      case 'info':
        content = 'Analyzing data...';
        break;
      case 'error':
        content = 'Error connecting to the data source.';
        break;
      case 'none':
        return { type, content: '' }; // No update
    }

    return { type, content };
  };

  const latestMessage = messages[messages.length - 1];

  return (
    <div className="research-loading-page">
      <ResearchLoadingBackground messages={messages} />
      {latestMessage ? (
        <ResearchLoadingState loadingMessage={latestMessage.content} />
      ) : (
        <ResearchLoadingState loadingMessage="Waiting for updates..." />
      )}
    </div>);
};

export default ResearchLoadingPage;
