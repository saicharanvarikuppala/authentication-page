import React from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Validation schema for login form
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
  };

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: values.email,
          password: values.password,
        }
      );
      navigate("/dashboard");
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error logging in:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        {/* Wrap with Formik */}
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched, handleSubmit }) => (
            <Box component="form" onSubmit={handleSubmit} noValidate>
              {/* Email field */}
              <Field
                name="email"
                as={TextField}
                margin="normal"
                fullWidth
                label="Email Address"
                autoComplete="email"
                autoFocus
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email ? errors.email : ""}
              />

              {/* Password field */}
              <Field
                name="password"
                as={TextField}
                margin="normal"
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password ? errors.password : ""}
              />

              {/* Submit button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>

              <Typography
                variant="body2"
                sx={{ mt: 1, mb: 3, textAlign: "start" }}
              >
                Don't have an account? &nbsp;
                <Link to={"/register"} style={{ textDecoration: "underline" }}>
                  Register
                </Link>
              </Typography>
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;
