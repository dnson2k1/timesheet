import { Box, Button } from "@mui/material";
import React from "react";
import Filters from "../Filters";
import { useStyles } from "./manageProjectsStyle";
import CreateProject from "./CreateProject/CreateProject";

const ManageProjects = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Box className={classes.managerProjects}>
        <Box>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => setOpen(true)}
          >
            + New Project
          </Button>
        </Box>
        <Box className={classes.flex1}>
          <Filters />
        </Box>
      </Box>

      <CreateProject open={open} setOpen={setOpen} />
    </>
  );
};

export default ManageProjects;
