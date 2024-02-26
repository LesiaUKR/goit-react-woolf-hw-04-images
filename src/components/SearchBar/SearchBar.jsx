import React, { useRef, useState } from 'react';
import {
  Header,
  Form,
  FormField,
  SearchButton,
  SearchInput,
} from './SearchBar.styled';
import { BiSearchAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const prevQueryRef = useRef('');

  const handleSearchQuery = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return toast.error('Введіть назву картинки');
    }
    if (prevQueryRef.current !== query) {
      onSubmit(query);
    }
    prevQueryRef.current = query;
    event.target.reset();
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <BiSearchAlt size="24" />
        </SearchButton>
        <FormField>
          <SearchInput
            autoComplete="off"
            name="query"
            type="text"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleSearchQuery}
            value={query}
          />
        </FormField>
      </Form>
    </Header>
  );
};
