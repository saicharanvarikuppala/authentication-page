import { Box, Menu, MenuItem, Typography } from "@mui/material";

const Dropdown = ({ menuItems, anchorEl, onClose, onSelect }) => {
  const handleMenuItemClick = (option) => {
    onSelect(option);
    onClose();
  };

  return (
    <Menu
      id="account-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", height: "100%", display: "revert"  }}
    >
      {menuItems?.map((item, index) => (
        <MenuItem key={index} onClick={() => handleMenuItemClick(item?.label)}>
          {item?.icon && <Box mr={1}>{item?.icon}</Box>}
          <Typography variant="inherit">{item?.label}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default Dropdown;
