import React, { useState } from "react";
import { Typography, Box, List, ListItem, ListItemText, Drawer, Divider, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material"; 
import MenuIcon from "@mui/icons-material/Menu"; 
import Header from "../Profile/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false); 

  // Check if the screen size is small (mobile view)
  const isMobile = useMediaQuery("(max-width:800px)");

  // Handle sidebar toggle
  const handleToggleSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handle external links
  const handleExternalLink = (url) => {
    window.open(url, "_blank");
  };

  // Handle navigation from the sidebar
  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false); 
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"} 
        open={isMobile ? mobileOpen : true} 
        onClose={handleToggleSidebar}
        ModalProps={{
          keepMounted: true, 
        }}
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
          <ListItem button onClick={() => handleExternalLink("https://valor-rpa.atlassian.net/jira/software/c/projects/DIG/boards/30?assignee=712020%3A8abadc10-db3a-40d8-bb56-a32faf25318a")}>
            <ListItemText primary="Tasks" />
          </ListItem>
          <ListItem button onClick={() => handleExternalLink("https://github.com/saicharanvarikuppala")}>
            <ListItemText primary="Github" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1 }}>
        {/* Header with Menu Icon for mobile */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            p: 0.9,
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
          }}
        >
          {/* Toggle Sidebar Icon in mobile */}
          {isMobile && (
            <IconButton onClick={handleToggleSidebar}>
              <MenuIcon />
            </IconButton>
          )}
  
          <Header handleToggleSidebar={handleToggleSidebar} />
        </Box>

        {/* Main content below the header */}
        <Box sx={{ p: 3 }}>
          <Typography variant="h4">Welcome to the Dashboard</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
