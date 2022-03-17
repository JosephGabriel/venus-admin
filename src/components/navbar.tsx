import React from "react";

import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
  Avatar,
} from "@material-ui/core";

import { Link } from "react-router-dom";

import { AccountCircle, Menu } from "@material-ui/icons";
import { userReactiveVar } from "../apollo/variables/user";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    marginLeft: "1.4rem",
  },
  linkText: {
    fontSize: "1rem",
    textTransform: "uppercase",
    color: "#fff",
  },
  linkContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  menuIcon: {
    color: "#fff",
  },
}));

type NavProps = {
  setColorMode: () => void;
};

export const Navbar = ({ setColorMode }: NavProps) => {
  const classes = useStyles();

  userReactiveVar.use();

  const user = userReactiveVar.get();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item md={6}>
            <IconButton onClick={setColorMode}>
              <Menu className={classes.menuIcon} />
            </IconButton>
          </Grid>
          <Grid item md={6} className={classes.linkContainer}>
            {!user?.user ? (
              <>
                <Link to="/login" className={classes.link}>
                  <Typography variant="h6" className={classes.linkText}>
                    Login
                  </Typography>
                </Link>
                <Link to="/signup" className={classes.link}>
                  <Typography variant="h6" className={classes.linkText}>
                    Sign up
                  </Typography>
                </Link>
              </>
            ) : (
              <>
                {user?.user.avatar ? (
                  <Avatar
                    alt={`${user?.user.firstName} ${user?.user.lastName}`}
                    src={user?.user.avatar}
                  />
                ) : (
                  <Avatar>
                    <AccountCircle />
                  </Avatar>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
