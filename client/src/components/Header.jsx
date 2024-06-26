import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Axios from "axios";
import { UserContext } from "./UserContext";

const drawerWidth = 240;

function DrawerAppBar(props) {
  const { userData, setUserData } = useContext(UserContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogOut = async () => {
    try {
      const res = await Axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/logout`,
        { withCredentials: true }
      );
    } catch (error) {
      console.log("Error in logging out", error);
    }
    setUserData(null);
    navigate("/login");
  };

  const navigateToPage = (destination) => {
    navigate(destination);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        CoderGeeks
      </Typography>
      <Divider />
      <List>
        {
          <>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => {
                  navigateToPage("/");
                }}
              >
                <ListItemText primary="HOME" />
              </ListItemButton>
            </ListItem>
            {!userData ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ textAlign: "center" }}
                    onClick={() => {
                      navigateToPage("/login");
                    }}
                  >
                    <ListItemText primary="LOGIN" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ textAlign: "center" }}
                    onClick={() => {
                      navigateToPage("/sign-up");
                    }}
                  >
                    <ListItemText primary="REGISTER" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ textAlign: "center" }}
                    onClick={() => {
                      navigateToPage("/problemlist");
                    }}
                  >
                    <ListItemText primary="PROBLEMS" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ textAlign: "center" }}
                    onClick={handleLogOut}
                  >
                    <ListItemText primary="LOGOUT" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </>
        }
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex"}}>
      <CssBaseline />
      <AppBar
        component="nav"
        position="static"
        sx={{ backgroundColor: "#112D4E", color: "white" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            CoderGeeks
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link to="/">
              <Button sx={{ color: "#fff" }}>HOME</Button>
            </Link>
            {userData ? (
              <Link to="/problemlist">
                <Button sx={{ color: "#fff" }}>PROBLEMS</Button>
              </Link>
            ) : (
              ""
            )}
            {!userData ? (
              <>
                <Link to="/login">
                  <Button sx={{ color: "#fff" }}>LOGIN</Button>
                </Link>

                <Link to="/sign-up">
                  <Button sx={{ color: "#fff" }}>REGISTER</Button>
                </Link>
              </>
            ) : (
              <Button sx={{ color: "#fff" }} onClick={handleLogOut}>
                LOGOUT
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default DrawerAppBar;
