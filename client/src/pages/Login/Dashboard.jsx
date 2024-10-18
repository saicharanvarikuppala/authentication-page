import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Welcome to the Dashboard</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
        sx={{ mt: 2 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
