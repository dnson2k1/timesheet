import { Box, Paper } from "@mui/material";
import React, { ReactNode } from "react";
import Header from "../Header";
import Nav from "../Nav";

import { useStyles } from "./layoutStyles";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <Box>
      <Header />
      <Box className={classes.flex}>
        <Nav />
        <Box className={classes.layBoxPaper}>
          <Paper elevation={3} className={classes.layoutPaper} square>
            {children}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
