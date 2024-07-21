import React from 'react';
import { Stack, Typography } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import LinkIcon from '@mui/icons-material/Link';

import './ResearchLoadingBackground.scss';
import { ResearchStateMessage } from 'src/api/apiCalls';

interface ResearchLoadingBackgroundProps {
  messages: ResearchStateMessage[];
}

const ResearchLoadingBackground: React.FC<ResearchLoadingBackgroundProps> = ({ messages }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <SentimentSatisfiedAltIcon style={{ color: 'green' }} />;
      case 'error':
        return <SentimentVeryDissatisfiedIcon style={{ color: 'red' }} />;
      case 'url':
        return <LinkIcon style={{ color: 'blue' }} />;
      default:
        return null;
    }
  };

  return (
    <div className="research-loading-background">
      <Stack spacing={1} direction="column">
        {messages.map((message, index) => (
          <Typography key={index} variant="body2" component="div" className="message">
            {getIcon(message.type)} {message.content}
          </Typography>
        ))}
      </Stack>
    </div>
  );
};

export default ResearchLoadingBackground;
