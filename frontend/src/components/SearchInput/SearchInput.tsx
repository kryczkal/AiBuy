import React from 'react';
import TextField from '@mui/material/TextField';
import './SearchInput.scss';

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <div className="search-input">
    <TextField
      fullWidth
      variant="outlined"
      placeholder="What do you need help with?"
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default SearchInput;
