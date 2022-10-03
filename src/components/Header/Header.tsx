import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import { useStyles } from "./headerStyles";

import classNames from "classnames";

const logo = require("~/assets/images/logo.png");

const Header = () => {
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.header}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar
          className={classNames(
            classes.flex,
            classes.flexItemsCenter,
            classes.flexJustify,
            classes.appBar
          )}
        >
          <Box>
            <Link to="/">
              <Box
                className={classNames(classes.flex, classes.flexItemsCenter)}
              >
                <img src={logo} alt="Logo" width={25} />
                <Box className={classes.title}>Timesheet</Box>
              </Box>
            </Link>
          </Box>
          <Box
            component="span"
            color="inherit"
            className={classNames(
              classes.flex,
              classes.flexItemsCenter,
              classes.flexJustify
            )}
          >
            <EllipsisVerticalIcon width={35} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
