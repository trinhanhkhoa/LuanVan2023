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
import GroupIcon from "@mui/icons-material/Group";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

const Sidebar = () => {
  const userType = window.localStorage.getItem("userType");

  return (
    <Box flex={1} p={2} sx={{ display: { xs: "block", sm: "block" } }}>
      <Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              LinkComponent="a"
              href={userType == "Admin" ? "/enhome" : "/home"}
            >
              <ListItemIcon>
                <HomeRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Trang chủ" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              LinkComponent="a"
              href={userType == "Admin" ? "/listofprocesses" : "/list"}
            >
              <ListItemIcon>
                {userType == "Admin" ? (
                  <CachedRoundedIcon />
                ) : (
                  <Inventory2RoundedIcon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={userType == "Admin" ? "Quy trình" : "Sản phẩm"}
              />
            </ListItemButton>
          </ListItem>
          {userType != "Admin" ? (
            <ListItem disablePadding>
              <ListItemButton LinkComponent="a" href="/process">
                <ListItemIcon>
                  <CachedRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Quy trình" />
              </ListItemButton>
            </ListItem>
          ) : null}
          {userType != "Admin" ? (
            <ListItem disablePadding>
              <ListItemButton LinkComponent="a" href="/history">
                <ListItemIcon>
                  <ManageSearchIcon />
                </ListItemIcon>
                <ListItemText primary="Lịch sử" />
              </ListItemButton>
            </ListItem>
          ) : null}
          {userType == "Admin" ? (
            <ListItem disablePadding>
              <ListItemButton LinkComponent="a" href="/enmanageaccounts">
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lý tài khoản" />
              </ListItemButton>
            </ListItem>
          ) : null}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
