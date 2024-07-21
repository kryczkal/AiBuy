import React from 'react';
import './HeaderWrapper.scss';
import Typography from '@mui/material/Typography/Typography';

interface HeaderWrapperProps {
  title: string;
  description: string;
}

const HeaderWrapper: React.FC<HeaderWrapperProps> = ({ title, description }) => (
  <div className="search-header">
    <Typography variant="h2" className="search-header-title">
      {title}
    </Typography>
    <p className="search-header-description">{description}</p>
  </div>
);
export default HeaderWrapper;
