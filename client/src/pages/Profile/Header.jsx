import React, { useState } from "react";
import { Tooltip, Avatar, IconButton, Stack, Box, AppBar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { userDetails } from "./UserSlice";
import Dropdown from "./Dropdown";
import ConfirmationModal from "./ConfirmationModal";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export default function Header({ handleToggleSidebar }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const selector = useSelector(userDetails);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close dropdown menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccountSelect = (value) => {
    if (value === "Logout") {
      setShowLogoutModal(true);
    } else if (value === "User Profile") {
        navigate("/profile"); 
        handleClose(); 
      }
  };

  const logout = () => {
    navigate('/login');
  };

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: "transparent" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2 }}>
        <Tooltip title="Toggle Menu">
          <IconButton onClick={handleToggleSidebar} size="large" sx={{ display: { xs: "flex", md: "none" } }}>
            <MenuIcon />
          </IconButton>
        </Tooltip>

        <Stack direction="row" spacing={2} sx={{ marginLeft: 'auto' }}>
          <Tooltip title="Account settings">
            <IconButton onClick={handleClick} size="small">
              <Avatar sx={{fontWeight: 'bold'}}>{selector?.firstName?.charAt(0)?.toUpperCase() || selector?.email?.charAt(0)?.toUpperCase()}</Avatar>
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Dropdown
        menuItems={[
          { label: "User Profile", icon: <PersonOutlineIcon /> },
          { label: "Logout", icon: <LogoutIcon /> },
        ]}
        anchorEl={anchorEl}
        onClose={handleClose}
        onSelect={(value) => {
          handleAccountSelect(value);
          handleClose();
        }}
      />

      {showLogoutModal && (
        <ConfirmationModal
          open={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={logout}
          confirmationText="Logout"
          cancelText="Cancel"
          title="Logout Confirmation"
          message="You are about to log out. Are you sure?"
        />
      )}
    </AppBar>
  );
}
