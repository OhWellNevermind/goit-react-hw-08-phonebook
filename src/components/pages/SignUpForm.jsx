import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';

const userSchema = Yup.object({
  name: Yup.string()
    .required('Name is a required field')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      `Name may contain only letters, apostrophe, dash and spaces.`
    ),
  email: Yup.string()
    .required('Email is a required field')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, `Wrong email`),
  password: Yup.string().required('Password is a required field'),
});

export const SignUpForm = () => {
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: userSchema,
    onSubmit: values => {
      console.log(values);
      dispatch(register(values));
    },
  });
  const dispatch = useDispatch();
  return (
    <form
      className="flex flex-col w-[400px] gap-4"
      onSubmit={formik.handleSubmit}
    >
      <label className="flex flex-col gap-1">
        <TextField
          autoComplete="on"
          className="border-slate-400 border-2 rounded-md p-2"
          type="text"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </label>
      <label className="flex flex-col gap-1">
        <TextField
          autoComplete="on"
          className="border-slate-400 border-2 rounded-md p-2"
          type="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </label>
      <label className="flex flex-col gap-1">
        <TextField
          autoComplete="on"
          className="border-slate-400 border-2 rounded-md p-2"
          type="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </label>
      <button
        className="w-[100px] bg-slate-400 rounded-lg p-2 text-white hover:bg-slate-600"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
};
