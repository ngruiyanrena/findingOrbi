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
     color: "pink",
      borderBottom: "1px solid white",
    },
  },
}));

// className={classes.logo}

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static" color="rgb(223, 182, 243)">
      <CssBaseline />
      <Toolbar>
        {/* <Typography variant="h6" className={classes.logo}>
          Finding Orbi
        </Typography> */}

        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Profile
            </Link>
            <Link to="/FindingGroupmates" className={classes.link}>
              Finding Groupmates
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;