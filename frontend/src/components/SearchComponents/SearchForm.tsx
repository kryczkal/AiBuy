import React from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import './SearchForm.scss';

interface SearchFormProps {
  problem: string;
  onProblemChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ problem, onProblemChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="search-form">
    <TextField
      className="search-input"
      fullWidth
      variant="outlined"
      placeholder="What do you need help with?"
      value={problem}
      onChange={onProblemChange}
      required
    />
    <Button
      type="submit"
      variant="contained"
      className="search-button"
      endIcon={<SearchIcon />}
    >
      Search
    </Button>
  </form>
);

export default SearchForm;
