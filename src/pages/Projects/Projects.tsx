import {
  ArrowPathIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ManageProjects from "~/components/ManageProjects";
import ProjectList from "~/components/ProjectList";
import { useAppDispatch, useAppSelector } from "~/hooks/hooks";
import {
  getAllProjects,
  getQuantityProjects,
} from "~/redux/ManageProject/manageProjectThunk";
import { getUserNotPagging } from "~/redux/Project/projectThunk";
import { useStyles } from "./projectsStyle";

const Projects = () => {
  const classes = useStyles();
  const { request } = useAppSelector((state) => state.manageProjectReducer);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRefresh = () => {
    window.location.reload();
    setAnchorEl(null);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProjects(request));
  }, [dispatch, request]);

  useEffect(() => {
    const getAPI = async () => {
      await dispatch(getAllProjects(request));
      await dispatch(getQuantityProjects());
      await dispatch(getUserNotPagging());
    };
    getAPI();
  }, [dispatch]);

  return (
    <Box>
      <Box className={classes.projects}>
        <Typography variant="h1" fontSize={18} fontWeight={400}>
          Manage Projects
        </Typography>

        <Box component="span" color="inherit" display="flex">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <EllipsisVerticalIcon width={30} />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleRefresh}>
              <ArrowPathIcon width={25} className={classes.refresh} /> Refresh
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      <Box paddingY={1} paddingX={2}>
        <ManageProjects />

        <ProjectList />
      </Box>
    </Box>
  );
};

export default Projects;
