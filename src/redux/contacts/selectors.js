import { createSelector } from '@reduxjs/toolkit';
import { selectFilter } from 'redux/filter/selectors';

export const selectContacts = state => state.contacts.items;

export const selectIsLoading = state => state.contacts.isLoading;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (filter.trim()) {
      return contacts.filter(contact => {
        return contact.name.toLowerCase().includes(filter?.toLowerCase());
      });
    } else {
      return contacts;
    }
  }
);
