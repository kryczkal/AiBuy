import React from 'react';

import './Header.scss';

interface HeaderProps {
  title: string;
  description: string;
}

const Header: React.FC<HeaderProps> = ({ title, description }) => (
  <div className="search-header">
    <h1 className="search-header-title">{title}</h1>
    <p className="search-header-description">{description}</p>
  </div>
);
export default Header;
