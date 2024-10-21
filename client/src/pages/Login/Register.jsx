import React from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// Validation schema for signup form
const signupSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobileNumber: Yup.string().required('Mobile number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const Register = () => {
  const navigate = useNavigate();

  // Function to define initial values
  const getInitialValues = () => ({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  });

  // Function to handle form submission
  const handleSignup = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        mobileNumber: values.mobileNumber,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      navigate("/login");
      console.log(response.data);
    } catch (error) {
      console.error('Error signing up:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Formik
          initialValues={getInitialValues()} 
          validationSchema={signupSchema}
          onSubmit={handleSignup} 
        >
          {({ errors, touched }) => (
            <Form>
              {/* First Name field */}
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                label="First Name"
                name="firstName"
                autoComplete="first-name"
                autoFocus
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />

              {/* Last Name field */}
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                label="Last Name"
                name="lastName"
                autoComplete="last-name"
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />

              {/* Email field */}
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />

              {/* Mobile Number field */}
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                label="Mobile Number"
                name="mobileNumber"
                autoComplete="mobile-number"
                error={Boolean(touched.mobileNumber && errors.mobileNumber)}
                helperText={touched.mobileNumber && errors.mobileNumber}
              />

              {/* Password field */}
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />

              {/* Confirm Password field */}
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />

              {/* Submit button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Typography variant="body2" sx={{ mt: 1, mb: 3, textAlign: "start" }}>
                Already have an account? &nbsp;
                <Link to={'/login'} style={{ textDecoration: "underline" }}>
                  Login
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Register;
