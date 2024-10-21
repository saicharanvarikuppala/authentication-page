import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId"); 

  useEffect(() => {
    // Function to fetch user data from API
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

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
          <Typography variant="body1">First Name: {userData.firstName}</Typography>
          <Typography variant="body1">Last Name: {userData.lastName}</Typography>
          <Typography variant="body1">Email: {userData.email}</Typography>
          <Typography variant="body1">Mobile Number: {userData.mobileNumber}</Typography>
          <Button variant="contained" color="primary" onClick={{}} sx={{mt: 2}}>Edit</Button>
          <Button variant="contained" color="primary" onClick={{}} sx={{ml: 2, mt: 2}}>Delete</Button>
        </Box>
      ) : (
        <Typography>No user data found</Typography>
      )}
    </Box>
  );
};

export default Profile;
