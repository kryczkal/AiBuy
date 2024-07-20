import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import './ResearchLoadingState.scss';

interface ResearchLoadingStateProps {
  loadingMessage: string;
}

const ResearchLoadingState: React.FC<ResearchLoadingStateProps> = ({ loadingMessage }) => {
  return (
    <div className="research-loading-state">
      <Typography variant="h6" component="h2" className="loading-message">
        {loadingMessage}
      </Typography>
      <CircularProgress color="primary" />
    </div>
  );
};

export default ResearchLoadingState;
