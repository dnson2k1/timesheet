import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import Filters from "../Filters";
import { useStyles } from "./manageProjectsStyle";
import CreateProject from "./CreateProject/CreateProject";
import { useAppDispatch, useAppSelector } from "~/hooks/hooks";
import { getAllCustomer } from "~/redux/Customer/customerThunk";
import { getAllTask } from "~/redux/ManageTask/manageTaskThunk";
import {
  getAllProjects,
  getQuantityProjects,
} from "~/redux/ManageProject/manageProjectThunk";
import { getUserNotPagging } from "~/redux/Project/projectThunk";

const ManageProjects = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { request } = useAppSelector((state) => state.manageProjectReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getAPI = async () => {
      await dispatch(getAllProjects(request));
      await dispatch(getQuantityProjects());
      await dispatch(getUserNotPagging());
      await dispatch(getAllCustomer());
      await dispatch(getAllTask());
    };
    getAPI();
  }, [dispatch]);
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
