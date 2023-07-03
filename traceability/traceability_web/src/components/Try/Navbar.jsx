import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Sidebar from "./Sidebar";
import { Avatar, Badge, InputBase, Menu, MenuItem } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import avatarImg from "../../asserts/logo.png";
import { Outlet } from "react-router-dom";
import logo from "../../asserts/logo2-removebg-preview.png";

const drawerWidth = 250;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const userType = window.localStorage.getItem("userType");
  const [data, setData] = useState([]);

  const handleDrawerOpen = () => {
    setOpenMenu(true);
  };

  const handleDrawerClose = () => {
    setOpenMenu(false);
  };

  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
  });

  const Search = styled("div")(({ theme }) => ({
    backgroundColor: "white",
    padding: "0 10px",
    borderRadius: theme.shape.borderRadius,
    width: "65%",
  }));

  const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    gap: "40px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  }));

  const AvatarBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "10px",
    alignItems: "center",
  }));

  const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "10px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  }));

  const tokenData = window.localStorage.getItem("token");

  const tokenIsValid = () => {
    fetch(`${process.env.REACT_APP_API}/tokenIsValid`, {
      method: "POST",
      crossDomain: true,
      headers: {
        "x-auth-token": tokenData,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
      });
  };

  const getUser = () => {
    fetch(`${process.env.REACT_APP_API}/getAnAuth`, {
      method: "GET",
      headers: {
        "x-auth-token": tokenData,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  };

  useEffect(() => {
    tokenIsValid();
    getUser();
  }, []);

  const logout = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };

  const profile = () => {
    window.location.href = "/profile";
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={openMenu}
        // color={userType == "admin" ? "#90caf9" : "success"}
        sx={
          (userType == "admin" || userType == "Admin")
            ? { backgroundColor: "#fff59d", color: "#000" }
            : { backgroundColor: "#aed581", color: "#000" }
        }
      >
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(openMenu && { display: "none" }) }}
          >
            <MenuRoundedIcon />
          </IconButton>
          <Box
            sx={{ display: { xs: "none", sm: "flex" }, cursor: "pointer", flexDirection: "row", justifyContent: "center", alignItems: "center" }}
            onClick={() => {
              userType == "User" || userType == "Farmer" || userType == "user"
                ? (window.location.href = "/home")
                : (window.location.href = "/enhome");
            }}
          >
            <img src={logo} width={80} height={80} />
            <Typography variant="h7" sx={{ width: 350}}>TRACEABILITY AGRICULTURE</Typography>
          </Box>

          <Search>{/* <InputBase placeholder="search..." /> */}</Search>
          {/* <Search><InputBase placeholder="search..." /></Search> */}

          <Icons>
            {/* <Badge badgeContent={4} color="error">
              <NotificationsRoundedIcon />
            </Badge> */}
            <AvatarBox onClick={(e) => setOpen(true)}>
              <Avatar
                sx={{ width: 30, height: 30, cursor: "pointer" }}
                src={avatarImg}
              />
              <Typography variant="span" sx={{ cursor: "pointer" }}>
                {data.name}
              </Typography>
            </AvatarBox>
          </Icons>
          <UserBox onClick={(e) => setOpen(true)}>
            <Avatar
              sx={{ width: 30, height: 30, cursor: "pointer" }}
              src={avatarImg}
            />
            <Typography variant="span" sx={{ cursor: "pointer" }}>
              {data.name}
            </Typography>
          </UserBox>
        </StyledToolbar>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          onClose={(e) => setOpen(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={profile}>Thông tin cá nhân</MenuItem>
          {/* <MenuItem>My account</MenuItem> */}
          <MenuItem onClick={logout}>Đăng xuất</MenuItem>
        </Menu>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={openMenu}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Sidebar />
      </Drawer>
      <Main open={openMenu}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
