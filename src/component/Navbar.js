import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  // Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(0),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: "18px",
    marginLeft: theme.spacing(5),
    align: "right",
    "&:hover": {
      color: "blue",
      borderBottom: "1px solid white",
    },
  },
}));



function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="fixed" color="rgb(223, 182, 243)">
      <CssBaseline />
      <Toolbar>
        {/* <Typography variant="h6" className={classes.logo}>
          Finding Orbi
        </Typography> */}

        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/Account" className={classes.link}>
              Profile
            </Link>
            <Link to="/FindingGroupmates" className={classes.link}>
              Finding Groupmates
            </Link>
            <Link to="/YourPosts" className={classes.link}>
              Your Posts
            </Link>
            <Link to="/YourProjects" className={classes.link}>
              Your Projects
            </Link>
            <Link to="/AboutUs" className={classes.link}>
              About Us
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;