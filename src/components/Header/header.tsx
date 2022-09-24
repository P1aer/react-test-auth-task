import React from "react";
import "./index.scss";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useAppDispatch } from "../../redux/store";
import { logout } from "../../redux/slices/authSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(logout());
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{ padding: "0.5rem 0.2rem" }}
        color="secondary"
        position="static"
      >
        <Toolbar>
          <img className="logo" src="React-icon.svg" alt="" />
          <Typography
            variant="h4"
            color="#00000"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <a className="logo-link" href="https://github.com/P1aer">
              {" "}
              Test App{" "}
            </a>
          </Typography>
          <Button onClick={onClick} sx={{ fontSize: "1.1rem" }} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
