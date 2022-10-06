import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import Filters from "../Filters";
import { useStyles } from "./manageProjectsStyle";
import CreateProject from "./CreateProject/CreateProject";
import { useAppDispatch } from "~/hooks/hooks";
import { getAllCustomer } from "~/redux/Customer/customerThunk";
import { getAllTask } from "~/redux/ManageTask/manageTaskThunk";

const ManageProjects = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCustomer());
    dispatch(getAllTask());
  }, []);

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
