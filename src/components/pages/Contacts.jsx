import { ContactsList } from 'components/ContactsList/ContactsList';
import { NewContactForm } from 'components/NewContactsForm/NewContactForm';
import { SearchBar } from 'components/SearchBar/SearchBar';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoading } from 'redux/contacts/selectors';

export const Contacts = () => {
  const isLoading = useSelector(selectIsLoading);
  return (
    <div>
      <NewContactForm />
      <SearchBar />
      {isLoading && <p>Refreshing data...</p>}
      <ContactsList />
    </div>
  );
};
