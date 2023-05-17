import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import GroupIcon from '@mui/icons-material/Group';
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";

const Sidebar = () => {
  const userType = window.localStorage.getItem("userType");

  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              LinkComponent="a"
              href={userType == "admin" ? "/enhome" : "/home"}
            >
              <ListItemIcon>
                <HomeRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              LinkComponent="a"
              href={userType == "admin" ? "/listofprocesses" : "/list"}
            >
              <ListItemIcon>
                {userType == "admin" ? (
                  <CachedRoundedIcon />
                ) : (
                  <Inventory2RoundedIcon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={userType == "admin" ? "Processes" : "Products"}
              />
            </ListItemButton>
          </ListItem>
          {userType == "admin" ? (
            <ListItem disablePadding>
              <ListItemButton LinkComponent="a" href="/enmanageaccounts">
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Accounts" />
              </ListItemButton>
            </ListItem>
          ) : null}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
