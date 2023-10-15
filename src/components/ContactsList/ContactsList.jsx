import propTypes from 'prop-types';
import { List, Button } from '@mui/material';
import { ContactListItem } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectVisibleContacts } from 'redux/contacts/selectors';
import { deleteContact, getContacts } from 'redux/contacts/operations';
import { useEffect } from 'react';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectVisibleContacts);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div>
      <List>
        {contacts.map(contact => {
          return (
            <ContactListItem key={contact.id}>
              <p>Name: {contact.name}</p>
              <p>Number: {contact.number}</p>
              <Button
                variant="contained"
                value={contact.id}
                onClick={evt => {
                  onDeleteContact(evt.target.value);
                }}
              >
                Delete
              </Button>
            </ContactListItem>
          );
        })}
      </List>
    </div>
  );
};

ContactsList.propTypes = {
  onDelete: propTypes.func,
  contacts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string,
      name: propTypes.string,
      number: propTypes.string,
    })
  ),
};
