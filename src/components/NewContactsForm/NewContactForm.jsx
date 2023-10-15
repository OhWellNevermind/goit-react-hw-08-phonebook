import { useFormik } from 'formik';
import { FormLayout, Label } from './NewContactForm.styled';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/contacts/selectors';
import { addContact } from 'redux/contacts/operations';

const userSchema = Yup.object({
  name: Yup.string()
    .required('Name is a required field')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      `Name may contain only letters, apostrophe, dash and spaces.`
    ),
  number: Yup.string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Number is a required field'),
});

export const NewContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const addNewContact = newContact => {
    const isInContacts = contacts.filter(contact => {
      return newContact.number === contact.number;
    }).length;

    if (isInContacts) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    dispatch(addContact({ ...newContact }));
  };

  const formik = useFormik({
    initialValues: { name: '', number: '' },
    validationSchema: userSchema,
    onSubmit: values => {
      addNewContact(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-[500px]">
      <FormLayout>
        <Label>
          <TextField
            id="name"
            value={formik.values.name}
            label="Name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          ></TextField>
        </Label>
        <Label>
          <TextField
            id="number"
            value={formik.values.number}
            label="Number"
            name="number"
            type="tel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.number && Boolean(formik.errors.number)}
            helperText={formik.touched.number && formik.errors.number}
          />
        </Label>
        <Button variant="outlined" type="submit">
          Add new contact
        </Button>
      </FormLayout>
    </form>
  );
};
