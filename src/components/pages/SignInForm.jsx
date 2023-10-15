import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from 'redux/auth/operations';
import { TextField } from '@mui/material';

const userSchema = Yup.object({
  email: Yup.string()
    .required('Email is a required field')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, `Wrong email`),
  password: Yup.string().required('Password is a required field'),
});

export const SignInForm = () => {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: userSchema,
    onSubmit: values => {
      dispatch(login(values));
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
        Sign In
      </button>
    </form>
  );
};
