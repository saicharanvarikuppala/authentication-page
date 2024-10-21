import React from "react";
import { Typography, Box, List, ListItem, ListItemText, Drawer, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();  

  // Handle navigation from the sidebar
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h5">Menu</Typography>
        </Box>
        <Divider />
        <List>
          <ListItem button onClick={() => handleNavigation("/dashboard")}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("/profile")}>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("/login")}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4">Welcome to the Dashboard</Typography>
        
      </Box>
    </Box>
  );
};

export default Dashboard;
