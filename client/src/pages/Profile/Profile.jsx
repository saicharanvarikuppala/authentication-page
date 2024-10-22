import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ConfirmationModal from "./ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./UserSlice";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}`
        );
        setUserData(response.data);
        dispatch(setUserDetails(response.data));
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, dispatch]);

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/user/${userId}`);
      navigate("/login");
    } catch (err) {
      setError("Failed to delete user");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/${userId}`,
        values
      );
      setUserData(response.data);
      dispatch(setUserDetails(response.data));
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update user data");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Profile</Typography>
      {userData ? (
        <Box sx={{ mt: 2 }}>
          {isEditing ? (
            <Formik
              initialValues={{
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                mobileNumber: userData.mobileNumber,
              }}
              validationSchema={Yup.object({
                firstName: Yup.string().required("Required"),
                lastName: Yup.string().required("Required"),
                email: Yup.string().email("Invalid email").required("Required"),
                mobileNumber: Yup.string().required("Required"),
              })}
              onSubmit={handleSubmit}
            >
              {({ handleChange }) => (
                <Form>
                  <Field
                    name="firstName"
                    as={TextField}
                    label="First Name"
                    fullWidth
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <Field
                    name="lastName"
                    as={TextField}
                    label="Last Name"
                    fullWidth
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <Field
                    name="email"
                    as={TextField}
                    label="Email"
                    fullWidth
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <Field
                    name="mobileNumber"
                    as={TextField}
                    label="Mobile Number"
                    fullWidth
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => setIsEditing(false)}
                    sx={{ ml: 2, mt: 2 }}
                  >
                    Cancel
                  </Button>
                </Form>
              )}
            </Formik>
          ) : (
            <>
              <Typography variant="body1">
                First Name: {userData.firstName}
              </Typography>
              <Typography variant="body1">
                Last Name: {userData.lastName}
              </Typography>
              <Typography variant="body1">Email: {userData.email}</Typography>
              <Typography variant="body1">
                Mobile Number: {userData.mobileNumber}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
                sx={{ mt: 2 }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => setShowDeleteModal(true)}
                sx={{ ml: 2, mt: 2 }}
              >
                Delete
              </Button>
            </>
          )}
        </Box>
      ) : (
        <Typography>No user data found</Typography>
      )}

      {showDeleteModal && (
        <ConfirmationModal
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          confirmationText="Delete"
          cancelText="Cancel"
          title="Delete User"
          message="Are you certain you want to proceed with the deletion of this user? This action will result in the removal of all associated data."
        />
      )}
    </Box>
  );
};

export default Profile;
